import React, { useState, useEffect } from 'react';
import styles from '../styles/fetchedprofiles.module.css';
import PropTypes from 'prop-types';

const FetchedProfiles = ({ onDataFetched }) => {
    const [titles, setTitles] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://web.ics.purdue.edu/~zong6/profile-app';

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/get-titles.php`);
                if (!response.ok) {
                    throw new Error('Failed to fetch titles.');
                }
                const data = await response.json();
                setTitles(['None', ...data.titles]);
                setSelectedTitle('None');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTitles();
    }, []);

    useEffect(() => {
        if (selectedTitle === '' || selectedTitle === 'None') {
            onDataFetched([]);
            return;
        }
        performSearch();
    }, [selectedTitle]);

    const performSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${API_BASE_URL}/fetch-data-with-filter.php?title=${encodeURIComponent(selectedTitle)}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch profiles.');
            }
            const data = await response.json();

            onDataFetched(data.profiles);
            
        } catch (err) {
            setError(err.message);
            onDataFetched([]);
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        setSelectedTitle(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Profile Search</h1>

                <div className={styles.inputContainer}>
                    <select
                        className={styles.inputField}
                        value={selectedTitle}
                        onChange={handleTitleChange}
                        disabled={loading}
                    >
                        {titles.map((t, index) => (
                            <option key={index} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className={styles.errorAlert} role="alert">
                        <span className={styles.errorText}>Error: {error}</span>
                    </div>
                )}

                {loading && (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

FetchedProfiles.propTypes = {
    onDataFetched: PropTypes.func.isRequired,
};

export default FetchedProfiles;