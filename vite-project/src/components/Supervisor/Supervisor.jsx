import { useState, useEffect } from "react";
import { isNotEmpty } from "../util/validation.js";
import Inputs from "../ui/Inputs.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import useHttp from "../../hooks/useHttp.js";

import "./Supervisors.css";

function Supervisor() {
  const [isEditing, setIsEditing] = useState(false);
  const [userIsActive, setUserIsActive] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userTeam, setUserTeam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [reloadSupervisors, setReloadSupervisors] = useState(0);

  const [validationErrors, setValidationErrors] = useState({});
  const [operationSuccess, setOperationSuccess] = useState(false);

  console.log("inceputul componet");

  const {
    data: fetchedUsers,
    isLoading,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/supervisor", { method: "GET" }, []);

  useEffect(() => {
    console.log("stare Supervizor" + reloadSupervisors);
    sendRequest();
  }, [reloadSupervisors, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log("set user" + error);
      if (JSON.stringify(users) !== JSON.stringify(fetchedUsers)) {
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      }
    }
  }, [fetchedUsers, error]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = users.filter((user) => {
      return (
        user.FirstName.toLowerCase().includes(lowercasedFilter) ||
        user.LastName.toLowerCase().includes(lowercasedFilter) ||
        user.Team.toLowerCase().includes(lowercasedFilter)
      );
    });
    console.log("userfiltrat");
    setFilteredUsers(filteredData);
  }, [searchTerm, users]);

  const roleOptions = [
    { value: "", label: "" },
    { value: "RBA", label: "RBA" },
    { value: "MRA", label: "MRA" },
    { value: "Cockpit", label: "Cockpit" },
    { value: "Doors", label: "Doors" },
    // Adaugă alte opțiuni aici
  ];

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

    const userData = {
      FirstName: userFirstName,
      LastName: userLastName,
      Team: userTeam,
      isActive: userIsActive,
    };

    const endpoint = isEditing ? `/supervisor/${editingUserId}` : "/supervisor";
    const method = isEditing ? "PUT" : "POST";
    console.log("url-ul este " + endpoint);
    sendRequest({
      url: `http://localhost:3000${endpoint}`,
      method: method,
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // Logică post-request
        resetFormState();
        setReloadSupervisors((prev) => prev + 1); // re-fetch
        console.log("set" + reloadSupervisors);
      })
      .catch((err) => {
        console.error("Failed to submit:", err);
      });
  };

  function resetFormState() {
    setUserFirstName("");
    setUserLastName("");
    setUserTeam("");
    setUserIsActive(false);
    setIsEditing(false);
    setEditingUserId(null);
    setValidationErrors({});
    setOperationSuccess(true);
  }

  const handleEdit = (user) => {
    setUserFirstName(user.FirstName);
    setUserLastName(user.LastName);
    setUserTeam(user.Team);
    setUserIsActive(user.isActive);
    setIsEditing(true);
    setEditingUserId(user.id); // Setarea ID-ului pentru a ști pe cine să actualizezi
    setOperationSuccess(false);
  };
  const handleExcelFile = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <>
      <section className="manualInput">
        <h1>Definire Supervisors</h1>
        {operationSuccess && (
          <h3>
            {isEditing ? "Userul a fost actualizat" : "Userul a fost creat"}
          </h3>
        )}
        <div className="supervisor-container">
          <div className="userName">
            <Inputs
              type="text"
              name="userFirstName"
              label="FirstName"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              error={validationErrors.firstName}
            />

            <Inputs
              type="text"
              name="userLastName"
              label="LastName"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              error={validationErrors.lastName}
            />

            <Select
              name="userTeam"
              label="Team"
              options={roleOptions}
              value={userTeam}
              onChange={(e) => setUserTeam(e.target.value)}
            />
            {isEditing && (
              <Checkbox
                type="checkbox"
                name="userIsActive"
                label="Is User Active?"
                checked={userIsActive}
                onChange={(e) => setUserIsActive(e.target.checked)}
              />
            )}
          </div>

          <div className="supervisor-action">
            <Inputs
              type="file"
              name="importFromExcel"
              label="Import from Excel"
              onChange={(e) => handleExcelFile(e)}
              accept=".xlsx, .xls"
            />
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
          {isLoading && <p>Loading data.</p>}
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

export default Supervisor;
