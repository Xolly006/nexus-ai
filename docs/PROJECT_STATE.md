# Etat du projet NEXUS

## Backend

- FastAPI expose `GET /` et `POST /chat`.
- `GET /` retourne `{"status": "NEXUS online"}`.
- `POST /chat` accepte un JSON avec `text` et renvoie la reponse Ollama en streaming texte.
- Le modele Ollama utilise par le backend est toujours `mistral`.
- `backend/request.py` reste un script de test manuel separe.

## Frontend

- `frontend/` contient une app React + Vite minimale.
- L'interface affiche un titre, une zone de chat vide, un champ texte et un bouton.
- Des fichiers issus du template Vite/React semblent encore presents, notamment `frontend/src/assets/react.svg`, `frontend/src/assets/vite.svg` et `frontend/README.md`.

## Contraintes conservees

- Pas de LangChain.
- Pas de Docker.
- Pas de base de donnees.
- Pas d'authentification.
- Pas de modification fonctionnelle du frontend.

