import Inputs from "../Inputs/Inputs.jsx";
import "./Echipe.css";

function Echipe() {
  return (
    <section className="manualInput">
      <h1>Definire Echipe</h1>
      <div className="userName">
        <Inputs type="text" name="userfirstName" label="TeamName" />
        <Inputs type="text" name="userlastName" label="LastName" />
      </div>
    </section>
  );
}

export default Echipe;
