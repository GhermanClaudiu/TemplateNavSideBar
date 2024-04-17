import { useState, useEffect } from "react";
import { isNotEmpty } from "../util/validation.js";
import Inputs from "../ui/Inputs.jsx";

import Button from "../ui/Button.jsx";

import "./Fabrica.css";

function Fabrica() {
  const [isEditing, setIsEditing] = useState(false);
  const [userIsActive, setUserIsActive] = useState(false); // Starea pentru activarea utilizatorului
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userTeam, setUserTeam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [reloadSupervisors, setReloadSupervisors] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [operationSuccess, setOperationSuccess] = useState(false);

  useEffect(() => {
    // Realizează cererea HTTP pentru a obține datele
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/supervisor"); // Ajustează URL-ul conform nevoilor tale
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredUsers(data); // Presupunem că datele primite sunt deja filtrate sau le vei filtra ulterior
      } catch (error) {
        console.error("Could not fetch data: ", error);
      }
    };

    fetchData();
  }, [reloadSupervisors]);

  /* Creaza Supervizor Nou */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previn comportamentul default de submit al formularului
    const errors = {};
    setOperationSuccess(false);

    if (!isNotEmpty(userFirstName)) {
      errors.firstName = "First name can't be empty";
    }

    if (!isNotEmpty(userLastName)) {
      errors.lastName = "Last name can't be empty";
    }
    if (!isNotEmpty(userTeam)) {
      errors.team = "Team can't be empty";
    }
    setValidationErrors(errors);

    // Dacă există erori, nu continua cu submitul
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Actualizează starea cu erorile găsite (dacă există)
    setValidationErrors(errors);
    const userData = {
      FirstName: userFirstName,
      LastName: userLastName,
      Team: userTeam,
      isActive: userIsActive,
    };
    const url = isEditing
      ? `http://localhost:3000/supervisor/${editingUserId}`
      : "http://localhost:3000/supervisor";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      /* const data = await response.json();
      console.log(data); // Procesează răspunsul de la server */
      // Aici poți să resetezi formularul sau să faci alte acțiuni după trimitere
      setOperationSuccess(true);
      setUserFirstName("");
      setUserLastName("");
      setUserTeam("");
      setUserIsActive(false);
      setIsEditing(false);
      setEditingUserId(null);
      setValidationErrors({});
      setReloadSupervisors((prevReload) => prevReload + 1);
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const handleEdit = (user) => {
    setUserFirstName(user.FirstName);
    setUserLastName(user.LastName);
    setUserTeam(user.Team);
    setUserIsActive(user.isActive);
    setIsEditing(true);
    setEditingUserId(user.id); // Setarea ID-ului pentru a ști pe cine să actualizezi
    setOperationSuccess(false);
  };
  console.log("userul poate fi creat" + validationErrors.create);
  return (
    <>
      <section className="manualInput">
        <h1>Definire Fabrici</h1>
        {operationSuccess && (
          <h3>
            {isEditing ? "Userul a fost actualizat" : "Userul a fost creat"}
          </h3>
        )}
        <div className="supervisor-container">
          <div className="userName">
            <Inputs
              type="text"
              name="planttName"
              label="PlantName"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              error={validationErrors.firstName}
            />
          </div>
          <div className="supervisor-action">
            <Button
              type="button"
              label={isEditing ? "Update User" : "Create User"}
              onClick={handleSubmit}
            />
          </div>
        </div>

        <div className="navigation">
          <div className="navigation-item">
            <h2>Supervisor List</h2>
          </div>
          <div className="navigation-item">
            <Inputs
              type="search"
              name="searchUser"
              label="Search Active User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Sectiunea2:Vizualizare user */}
      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Team</th>
              <th>UserActive</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Team}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => handleEdit(user)} data-id={user.id}>
                    📝
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
export default Fabrica;
