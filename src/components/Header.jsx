import React from 'react';
import '../styles/global.css';

const handleScroll = (position) => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (position === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (position === 'middle') {
        window.scrollTo({ top: height / 2, behavior: 'smooth' });
    } else if (position === 'bottom') {
        window.scrollTo({ top: height, behavior: 'smooth' });
    }
};

const Header = () => (
    <header className="header">
        <nav>
            <ul className="header-nav">
                <li>
                    <button className="header-btn" onClick={() => handleScroll('top')}>Main</button>
                </li>
                <li>
                    <button className="header-btn" onClick={() => handleScroll('middle')}>About</button>
                </li>
                <li>
                    <button className="header-btn" onClick={() => handleScroll('bottom')}>Staff</button>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;