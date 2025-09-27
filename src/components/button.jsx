const ButtonSubmit = ({ onClick, children, style, disabled }) => {
  return (
    <button type="submit" className={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
