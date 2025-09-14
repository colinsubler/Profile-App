import React, { useState, useEffect } from 'react';
import styles from '../styles/header.module.css';

const handleScroll = (position) => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (position === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (position === 'middle') {
        window.scrollTo({ top: height / 5, behavior: 'smooth' });
    } else if (position === 'bottom') {
        window.scrollTo({ top: height / 2, behavior: 'smooth' });
    }
};

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
                        <button className={styles['header-btn']} onClick={() => handleScroll('top')}>Main</button>
                    </li>
                    <li>
                        <button className={styles['header-btn']} onClick={() => handleScroll('middle')}>About</button>
                    </li>
                    <li>
                        <button className={styles['header-btn']} onClick={() => handleScroll('bottom')}>Staff</button>
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