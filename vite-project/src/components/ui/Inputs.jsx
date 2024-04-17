import PropTypes from "prop-types";
import "./Inputs.css";

function Inputs({ type, name, label, value, onChange, error, accept }) {
  // Verifică dacă tipul este 'file' pentru a gestiona condițional propietatea `value`
  const inputProps = type === "file" ? { accept } : { value };

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        {...inputProps} // Aplică `value` sau `accept` bazat pe tipul inputului
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

Inputs.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  accept: PropTypes.string,
};

export default Inputs;
