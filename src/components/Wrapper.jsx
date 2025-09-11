const Wrapper = ({ children, id }) => {
    return (
        <div className="wrapper" id={id}>
            {children}
        </div>
    );
};

export default Wrapper;