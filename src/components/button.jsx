const ButtonSubmit = ({ onClick, children, style })=>{

    return (
        <button
            type="submit"
            className={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonSubmit;