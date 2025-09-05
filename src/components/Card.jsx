import PropTypes from "prop-types";

const Card = ({ imgSrc, title, description }) => {
    return (
        <div className="card">
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
};

export default Card;