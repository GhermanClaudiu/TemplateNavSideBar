import { useState, useEffect } from "react";
import Inputs from "../Inputs/Inputs";
import Select from "../Select/Select";
import Button from "../Buttons/Button.jsx";
import "./Supervisors.css";

function Supervisor() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userTeam, setUserTeam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [reloadSupervisors, setReloadSupervisors] = useState(0);

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

  const roleOptions = [
    { value: "RBA", label: "RBA" },
    { value: "MRA", label: "MRA" },
    { value: "Cockpit", label: "Cockpit" },
    // Adaugă alte opțiuni aici
  ];

  const handleSubmit = async (e) => {
    console.log("Attempting to submit form");
    e.preventDefault(); // Previn comportamentul default de submit al formularului

    const userData = {
      FirstName: userFirstName,
      LastName: userLastName,
      Team: userTeam,
    };
    console.log(userFirstName);
    console.log(`user ${userData.FirstName}`);
    try {
      const response = await fetch("http://localhost:3000/supervisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Procesează răspunsul de la server
      // Aici poți să resetezi formularul sau să faci alte acțiuni după trimitere
      setReloadSupervisors((prevReload) => prevReload + 1);
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const handleEdit = (user) => {
    setUserFirstName(user.FirstName);
    setUserLastName(user.LastName);
    setUserTeam(user.Team);
    setIsEditing(true);
    setEditingUserId(user.id); // Setarea ID-ului pentru a ști pe cine să actualizezi
  };

  return (
    /* Sectiunea1: Manual Inputs */
    <>
      <section className="manualInput">
        <h1>Definire Supervisors</h1>
        <div className="userName">
          <Inputs
            type="text"
            name="userFirstName"
            label="FirstName"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />

          <Inputs
            type="text"
            name="userLastName"
            label="LastName"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />

          <Select
            name="userTeam"
            label="Team"
            options={roleOptions}
            value={userTeam}
            onChange={(e) => setUserTeam(e.target.value)}
          />

          <Button type="button" label="Create user" onClick={handleSubmit} />
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
              value={searchTerm} // Folosește starea searchTerm ca valoare pentru input
              onChange={(e) => setUserTeam(e.target.value)} // Actualizează searchTerm pe măsură ce utilizatorul scrie
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
                  <td>
                    <button onClick={() => handleEdit(user)} data-id={user.id}>
                      📝
                    </button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Supervisor;
