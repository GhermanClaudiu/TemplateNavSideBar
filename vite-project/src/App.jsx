import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx"; // Ajustează calea conform structurii tale de proiect
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Echipe from "./components/Echipe/Echipe.jsx";
import Supervisor from "./components/Supervisor/Supervisor.jsx";
import User from "./components/User/User.jsx";
import Fabrica from "./components/Fabrica/Fabrica.jsx";
import "./App.css";
import Angajati from "./components/Angajati/Angajati.jsx";

function App() {
  return (
    <div className="app-grid">
      <Navbar />
      <Sidebar />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/fabrica" element={<Fabrica />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/echipe" element={<Echipe />} />
          <Route path="/angajati" element={<Angajati />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
