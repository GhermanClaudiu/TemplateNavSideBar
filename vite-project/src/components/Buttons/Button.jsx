const Button = ({ type, label, onClick }) => {
  return (
    <div className="button-container">
      <button type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
export default Button;
