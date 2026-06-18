# Etat du projet NEXUS

## Statut general

- Le repository GitHub existe.
- Le premier commit a ete pousse.
- Le projet a ete reorganise avec une separation simple entre backend, frontend et documentation.
- Le chat fonctionne maintenant entre le frontend React et le backend FastAPI.

## Backend

- Le backend FastAPI se trouve dans `backend/app/`.
- `backend/app/main.py` cree l'application FastAPI.
- FastAPI expose actuellement `GET /` et `POST /chat`.
- `GET /` retourne `{"status": "NEXUS online"}`.
- `POST /chat` accepte un JSON avec `text`.
- `POST /chat` appelle Ollama local sur `http://localhost:11434/api/generate`.
- Le modele Ollama utilise par le backend est toujours `mistral`.
- La reponse de NEXUS est renvoyee en streaming avec le media type `text/plain`.
- CORS est configure avec `CORSMiddleware`.
- Les origines frontend autorisees en developpement sont `http://localhost:5173` et `http://127.0.0.1:5173`.
- La route `/chat` est maintenant utilisee par le frontend.

## Frontend

- `frontend/` contient une app React + Vite.
- `frontend/src/App.jsx` contient maintenant un formulaire de chat fonctionnel.
- L'input est controle avec `useState`.
- Le formulaire utilise `onSubmit`.
- L'envoi fonctionne avec le bouton `Envoyer` et avec la touche Entree.
- Le frontend appelle maintenant `POST /chat` avec `fetch`.
- Le body envoye est un JSON de forme `{ text: newMessage }`.
- Le frontend lit la reponse avec `response.text()`.
- Les messages sont stockes dans l'etat React `messages`.
- Les messages sont des objets avec `role` et `content`.
- Les roles actuellement utilises sont `user`, `assistant` et `error`.
- Un etat `isLoading` existe.
- Pendant l'attente de reponse, l'interface affiche un message de chargement.
- Le bouton d'envoi est desactive pendant le chargement.
- `handleSend` contient une garde logique pour eviter un nouvel envoi si `isLoading` est deja actif.
- Des fichiers issus du template Vite/React semblent encore presents, notamment `frontend/src/assets/react.svg`, `frontend/src/assets/vite.svg` et `frontend/README.md`.

## Arborescence resumee

- `backend/app/main.py` : point d'entree FastAPI.
- `backend/app/routes/` : routes HTTP, dont `POST /chat`.
- `backend/app/schemas/` : schemas Pydantic.
- `backend/app/services/` : logique externe, dont l'appel a Ollama.
- `backend/requirements.txt` : dependances Python minimales.
- `frontend/` : app React + Vite avec formulaire de chat fonctionnel.
- `docs/` : etat du projet et prochaines etapes.

## Decisions techniques

- Pas de base de donnees pour l'instant.
- L'historique reste temporairement dans `useState`.
- Pas de `localStorage` maintenant.
- `localStorage` pourra etre ajoute plus tard, apres stabilisation de l'interface.
- SQLite sera envisage seulement quand le chat sera stable.
- ChromaDB et la memoire intelligente/RAG viendront beaucoup plus tard.
- Le design avance, le mode sombre/clair, le streaming mot par mot, la memoire et les modules avances restent des etapes futures.
- L'identite avancee de NEXUS sera ajoutee plus tard via un prompt systeme et/ou une configuration backend.

## Contraintes conservees

- Pas de LangChain.
- Pas de Docker.
- Pas de base de donnees.
- Pas d'authentification.
- Pas de ChromaDB/RAG maintenant.
- Pas de `localStorage` maintenant.
