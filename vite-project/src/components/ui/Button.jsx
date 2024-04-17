import PropTypes from "prop-types";

const Button = ({ type, label, onClick }) => {
  return (
    <div className="button-container">
      <button type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
