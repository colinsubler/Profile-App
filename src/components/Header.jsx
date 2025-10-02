import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import { useMode } from './ModeContext';

const Header = () => {
  const { dark, toggleMode } = useMode();

  return (
    <header className={styles.header}>
      <nav className={styles['header-nav-container']}>
        <ul className={styles['header-nav']}>
          <li><Link to="/" className={styles['header-btn']}>Home</Link></li>
          <li><Link to="/about" className={styles['header-btn']}>About</Link></li>
          <li><Link to="/add-profile" className={styles['header-btn']}>Add Profile</Link></li>
          <li><Link to="/local-profiles" className={styles['header-btn']}>Local Profiles</Link></li>
          <li><Link to="/fetched-profiles" className={styles['header-btn']}>Fetched Profiles</Link></li>
        </ul>
        <button
          className={styles['toggle-btn']}
          onClick={toggleMode}
          aria-label="Toggle dark mode"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
