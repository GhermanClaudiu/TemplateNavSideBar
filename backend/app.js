import fs from "node:fs/promises";
import cors from "cors";

import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
/* Get Methods */
app.get("/supervisor", async (req, res) => {
  const data = await fs.readFile("./data/supervisors.json", "utf8");
  res.json(JSON.parse(data));
});
app.get("/angajati", async (req, res) => {
  const data = await fs.readFile("./data/supervisors.json", "utf8");
  res.json(JSON.parse(data));
});

/* Post Methods */
app.post("/supervisor", async (req, res) => {
  const { FirstName, LastName, Team } = req.body; // Folosind aceleași denumiri ca în fișierul JSON

  if (!FirstName || !LastName || !Team) {
    return res.status(400).json({ message: "Missing data." });
  }

  const newSupervisor = {
    id: `s${Math.random().toString(16).slice(2)}`, // Generarea unui ID unic
    FirstName,
    LastName,
    Team,
    isActive: true,
  };

  try {
    const data = await fs.readFile("./data/supervisors.json", "utf8");
    const supervisors = JSON.parse(data);
    supervisors.push(newSupervisor); // Adaugă noul supervisor în array
    console.log("supervisor" + supervisors);
    await fs.writeFile(
      "./data/supervisors.json",
      JSON.stringify(supervisors, null, 2)
    ); // Scrie înapoi în fișier cu un format frumos
    res
      .status(201)
      .json({ message: "Supervisor created!", supervisor: newSupervisor });
  } catch (error) {
    console.error("Failed to save the supervisor:", error);
    res.status(500).json({ message: "Failed to save the supervisor." });
  }
});

/* Delete Methods */
app.delete("/supervisor/:id", async (req, res) => {
  const { id } = req.params; // Extrage id-ul din parametrii rutei
  console.log("id este" + id);
  try {
    const data = await fs.readFile("./data/supervisors.json", "utf8");
    let supervisors = JSON.parse(data);

    // Găsește indexul utilizatorului pe baza id-ului
    const index = supervisors.findIndex((supervisor) => supervisor.id === id);

    if (index === -1) {
      // Dacă utilizatorul nu este găsit, trimite un răspuns de eroare
      return res.status(404).json({ message: "Supervisor not found." });
    }

    // Elimină utilizatorul din array
    supervisors.splice(index, 1);

    // Scrie înapoi array-ul actualizat în fișier
    await fs.writeFile(
      "./data/supervisors.json",
      JSON.stringify(supervisors, null, 2)
    );

    res.status(200).json({ message: "Supervisor deleted successfully." });
  } catch (error) {
    console.error("Failed to delete the supervisor:", error);
    res.status(500).json({ message: "Failed to delete the supervisor." });
  }
});

/* PUT Method - Update a Supervisor */
app.put("/supervisor/:id", async (req, res) => {
  const { id } = req.params; // ID-ul supervisorului pentru actualizare
  const { FirstName, LastName, Team, isActive } = req.body; // Datele actualizate

  if (!FirstName || !LastName || !Team) {
    return res.status(400).json({ message: "Missing data for update." });
  }

  try {
    const data = await fs.readFile("./data/supervisors.json", "utf8");
    let supervisors = JSON.parse(data);

    // Găsește supervisorul pe baza ID-ului
    const supervisorIndex = supervisors.findIndex((sup) => sup.id === id);

    if (supervisorIndex === -1) {
      // Dacă supervisorul nu este găsit, trimite un răspuns de eroare
      return res.status(404).json({ message: "Supervisor not found." });
    }

    // Actualizează detaliile supervisorului
    supervisors[supervisorIndex] = {
      ...supervisors[supervisorIndex],
      FirstName,
      LastName,
      Team,
      isActive:
        isActive !== undefined
          ? isActive
          : supervisors[supervisorIndex].isActive, // Menține valoarea anterioară dacă `isActive` nu este specificat
    };

    // Scrie înapoi lista actualizată în fișier
    await fs.writeFile(
      "./data/supervisors.json",
      JSON.stringify(supervisors, null, 2)
    );

    res.status(200).json({ message: "Supervisor updated successfully." });
  } catch (error) {
    console.error("Failed to update the supervisor:", error);
    res.status(500).json({ message: "Failed to update the supervisor." });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

const PORT = 3000;
app.listen(PORT);
console.log("backend ruleaza pe portul: " + PORT);
