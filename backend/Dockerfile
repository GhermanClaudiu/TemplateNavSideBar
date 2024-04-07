# Folosește imaginea oficială Node.js ca imagine de bază
FROM node:20.10.0

# Setează directorul de lucru în container
WORKDIR /usr/src/app

# Copiază toate fișierele sursă ale proiectului în container
COPY . .

# Instalează dependențele proiectului
RUN npm install

# Expune portul pe care rulează aplicația Node.js
EXPOSE 3000

# Comanda pentru a porni aplicația Node.js
CMD ["node", "app.js"]
