import PropTypes from "prop-types";
import styles from "../styles/card.module.css";
import React, { useEffect, useState } from "react";

const Card = ({ imgSrc, name, title, email, bio, dark }) => {
    const [fadeClass, setFadeClass] = useState("");

    useEffect(() => {
        setFadeClass(styles["fade-in"]);
    }, []);

    return (
        <div className={`${styles.card} ${fadeClass} ${dark ? styles.dark : ""}`}>
            <img src={imgSrc} alt="Headshot" />
            <h1>{name}</h1>
            <h1>{title}</h1>
            <h3>{email}</h3>
            <p>{bio}</p>
        </div>
    );
}

Card.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    dark: PropTypes.bool,
};

export default Card;