import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

const Header = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  return (
    <header className={styles.header}>
      <nav className={styles['header-nav-container']}>
        <ul className={styles['header-nav']}>
          <li>
            <Link to="/" className={styles['header-btn']}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={styles['header-btn']}>About</Link>
          </li>
          <li>
            <Link to="/add-profile" className={styles['header-btn']}>Add Profile</Link>
          </li>
          <li>
            <Link to="/local-profiles" className={styles['header-btn']}>
              Local Profiles
            </Link>
          </li>
          <li>
            <Link to="/fetched-profiles" className={styles['header-btn']}>Fetched Profiles</Link>
          </li>
        </ul>
        <button
          className={styles['toggle-btn']}
          onClick={() => setDark((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
