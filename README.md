# Sistem de Management al Vizitelor Medicale pentru angajatii companiei

Sistemul de Management al vizitelor Medicale este o aplicație web pentru gestionarea angajatilor din cadrul unei companii.
Permite crearea, actualizarea și ștergerea informațiilor despre supervisorii echipelor, precum și filtrarea acestora în funcție de activitate.

## Caracteristici Principale

- Adăugare, actualizare și ștergere supervisor
- Vizualizare lista supervisorilor,...,
- Filtrare supervisorilor activi/inactivi

## Tehnologii Utilizate

- Frontend: React
- Backend: Node.js, Express
- Baza de date: JSON file (simulare)
- Containerizare: Docker

## Cerințe Preliminare

- Docker instalat pe sistem
- Node.js (pentru dezvoltare locală)

## Instalare și Configurare

Pentru a rula acest proiect, asigurați-vă că aveți Docker instalat și funcțional, apoi urmați pașii de mai jos:

1. Clonare repository:

   ```
   git clone https://github.com/exemplu/proiect.git
   cd proiect
   ```

2. Construirea și rularea containerelor Docker:
   ```
   docker-compose up --build
   ```
   daca nu functioneaza
   ...
   cd backend
   npm start
   ...
   cd vite-project
   npm run dev

## Utilizare

După construirea și rularea containerelor, aplicația va fi accesibilă la:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Contribuții

Pentru a contribui la proiect, vă rugăm să urmați pașii standard de pull request:

1. Fork proiectul
2. Creați o ramură nouă (`git checkout -b feature/NumeFeature`)
3. Commit modificările (`git commit -am 'Adăugare unei noi funcționalități'`)
4. Push la ramură (`git push origin feature/NumeFeature`)
5. Deschideți un Pull Request

## Licență

Proiectul este distribuit sub Licența GCC.

## Contact

Pentru orice întrebări sau sugestii, vă rugăm să ne contactați la adresa de email: gherman_claudiu_77@yahoo.com
