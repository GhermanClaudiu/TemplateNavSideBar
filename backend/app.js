import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

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
  };

  try {
    const data = await fs.readFile("./data/supervisors.json", "utf8");
    const supervisors = JSON.parse(data);
    supervisors.push(newSupervisor); // Adaugă noul supervisor în array
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

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

const PORT = 3000;
app.listen(PORT);
console.log("backend ruleaza pe portul: " + PORT);
