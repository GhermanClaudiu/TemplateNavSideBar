import PropTypes from "prop-types";
import "./Inputs.css";

function Inputs({ type, name, label, value, onChange, error }) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="control-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
export default Inputs;

Inputs.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string, //
};
