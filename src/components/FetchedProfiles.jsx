import React, { useState, useEffect } from 'react';
import styles from '../styles/fetchedprofiles.module.css';
import PropTypes from 'prop-types';

const FetchedProfiles = ({ onDataFetched }) => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allProfiles, setAllProfiles] = useState(null); // null until fetched

  const API_BASE_URL = 'https://web.ics.purdue.edu/~zong6/profile-app';

  // 1️⃣ Fetch titles and all profiles on mount
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get-titles.php`);
        if (!res.ok) throw new Error('Failed to fetch titles.');
        const data = await res.json();
        setTitles(['All', ...(Array.isArray(data.titles) ? data.titles : [])]);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAllProfiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/fetch-data.php`);
        if (!res.ok) throw new Error('Failed to fetch all profiles.');
        const data = await res.json();
        const profiles = Array.isArray(data)
          ? data
          : Array.isArray(data.profiles)
          ? data.profiles
          : [];
        setAllProfiles(profiles);
        onDataFetched(profiles); // show all profiles initially
      } catch (err) {
        setError(err.message);
        onDataFetched([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
    fetchAllProfiles();
  }, []);

  useEffect(() => {
    if (!selectedTitle || selectedTitle === 'All') return; // do nothing

    const fetchFiltered = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE_URL}/fetch-data-with-filter.php?title=${encodeURIComponent(selectedTitle)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch filtered profiles.');
        const data = await res.json();
        const profiles = Array.isArray(data)
          ? data
          : Array.isArray(data.profiles)
          ? data.profiles
          : [];
        onDataFetched(profiles);
      } catch (err) {
        setError(err.message);
        onDataFetched([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTitle]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setSelectedTitle(value);

    if (value === 'All' && allProfiles) {
      onDataFetched(allProfiles);
    }
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
