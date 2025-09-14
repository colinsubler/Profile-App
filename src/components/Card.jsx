import PropTypes from "prop-types";
import styles from "../styles/card.module.css";
import React, { useEffect, useState } from "react";

const Card = ({ imgSrc, title, description, dark }) => {
    const [fadeClass, setFadeClass] = useState("");

    useEffect(() => {
        setFadeClass(styles["fade-in"]);
    }, []);

    return (
        <div className={`${styles.card} ${fadeClass} ${dark ? styles.dark : ""}`}>
            <img src={imgSrc} alt="Headshot" />
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

Card.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dark: PropTypes.bool,
};

export default Card;