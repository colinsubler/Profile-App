import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/notfound.module.css';

const NotFound = () => {
  return (
    <div className={styles['notfound-container']}>
      <h1 className={styles['notfound-heading']}>404</h1>
      <h2 className={styles['notfound-subheading']}>Page Not Found</h2>
      <p className={styles['notfound-text']}>
        Oops! The page you're looking for doesn't exist. You can return to the home page.
      </p>
      <Link to="/" className={styles['notfound-btn']}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
