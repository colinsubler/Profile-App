import { useRef } from 'react';
import styles from '../styles/filters.module.css';

const Filters = ({
    titles,
    selectedValue,
    onDescriptionChange,
    searchValue,
    onSearchChange,
    onClear
}) => {
    const searchInputRef = useRef(null);

    const handleSelectChange = (e) => {
        if (e.target.value === 'all') {
            onClear();
        } else {
            onDescriptionChange(e);
        }
    };

    const handleClear = () => {
        onClear();
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // autofocus after clearing
        }
    };

    return (
        <div className={styles['filter-container']}>
            <div className={styles['select-filter']}>
                <label htmlFor="select" className={styles['filter-label']}>
                    Filter by Job Title:
                </label>
                <select
                    id="select"
                    onChange={handleSelectChange}
                    value={selectedValue}
                    className={styles['filter-select']}
                >
                    <option value="all">All</option>
                    {titles.map((title, idx) => (
                        <option key={idx} value={title}>{title}</option>
                    ))}
                </select>
            </div>
            <div className={styles['search-filter']}>
                <label htmlFor="searchName" className={styles['filter-label']}>
                    Search by Name:
                </label>
                <input
                    id="searchName"
                    type="text"
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder="Enter name"
                    className={styles['filter-input']}
                    ref={searchInputRef} // attach ref here
                />
            </div>
            <button
                type="button"
                onClick={handleClear}
                className={styles['clear-btn']}
            >
                Clear
            </button>
        </div>
    );
};

export default Filters;
