import React from 'react';
import homeImg from '../assets/campus.png';
import styles from '../styles/home.module.css';

const Home = () => {
  return (
    <div className={styles['home-container']}>
      <h1 className={styles['home-heading']}>Welcome to Internet Corp.</h1>
      <img
        src={homeImg}
        alt="Campus"
        className={styles['home-image']}
      />
      <p className={styles['home-subtext']}>
        At Internet Corp., we innovate, connect, and empower businesses worldwide. Explore our services and meet the team dedicated to making the web a better place.
      </p>
    </div>
  );
};

export default Home;
