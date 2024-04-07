# Folosește imaginea oficială Node.js ca imagine de bază
FROM node:20.10.0


# Setează directorul de lucru în container
WORKDIR /usr/src/app

# Copiază fișierul 'package.json' și 'package-lock.json' (dacă există) în directorul de lucru
COPY package*.json ./

# Instalează dependențele proiectului, inclusiv cele de dezvoltare
RUN npm install

# Copiază toate fișierele sursă ale proiectului în container
COPY . .

# Construiește aplicația pentru producție
RUN npm run build

# Instalează un server HTTP simplu pentru servirea conținutului static
RUN npm install serve

# Expune portul pe care va rula serverul HTTP
EXPOSE 5173

# Comanda pentru a servi aplicația folosind serve
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]
