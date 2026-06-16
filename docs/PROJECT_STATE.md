# Etat du projet NEXUS

## Statut general

- Le repository GitHub existe.
- Le premier commit a ete pousse.
- Le projet a ete reorganise avec une separation simple entre backend, frontend et documentation.

## Backend

- Le backend FastAPI se trouve dans `backend/app/`.
- `backend/app/main.py` cree l'application FastAPI.
- FastAPI expose actuellement `GET /` et `POST /chat`.
- `GET /` retourne `{"status": "NEXUS online"}`.
- `POST /chat` accepte un JSON avec `text`.
- `POST /chat` appelle Ollama local sur `http://localhost:11434/api/generate`.
- Le modele Ollama utilise par le backend est toujours `mistral`.
- La reponse de NEXUS est renvoyee en streaming avec le media type `text/plain`.
- `backend/request.py` etait un script manuel d'entrainement. S'il est encore present, il est a supprimer plus tard apres confirmation.

## Frontend

- `frontend/` contient une app React + Vite minimale.
- L'interface affiche un titre, une zone de chat vide, un champ texte et un bouton.
- Le frontend n'appelle pas encore le backend.
- Les messages ne sont pas encore geres dans l'etat React.
- La prochaine grande etape est le frontend : input controle, affichage des messages, appel backend, puis affichage de la reponse de NEXUS dans l'interface.
- Des fichiers issus du template Vite/React semblent encore presents, notamment `frontend/src/assets/react.svg`, `frontend/src/assets/vite.svg` et `frontend/README.md`.

## Arborescence resumee

- `backend/app/main.py` : point d'entree FastAPI.
- `backend/app/routes/` : routes HTTP, dont `/chat`.
- `backend/app/schemas/` : schemas Pydantic.
- `backend/app/services/` : logique externe, dont l'appel a Ollama.
- `backend/requirements.txt` : dependances Python minimales.
- `frontend/` : app React + Vite minimale.
- `docs/` : etat du projet et prochaines etapes.

## Decisions techniques

- Pas de base de donnees pour l'historique immediat.
- L'historique des messages commencera avec `useState` dans React.
- `localStorage` viendra ensuite pour conserver un historique local simple.
- SQLite sera envisage seulement plus tard, quand le chat fonctionnera deja correctement.
- ChromaDB et la memoire intelligente/RAG viendront beaucoup plus tard.
- Le mode sombre/clair est documente comme une future feature UI, pas comme une priorite d'implementation actuelle.

## Contraintes conservees

- Pas de LangChain.
- Pas de Docker.
- Pas de base de donnees.
- Pas d'authentification.
- Pas de modification fonctionnelle du frontend.
