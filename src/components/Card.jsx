const Card = ({ imgSrc, title, description }) => {
    return (
        <div className="card">
            <img src={imgSrc} alt="Headshot" />
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

export default Card;