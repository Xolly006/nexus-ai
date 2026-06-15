# NEXUS

NEXUS est un assistant IA personnel local avec un backend FastAPI et une interface React + Vite.

## Structure

- `backend/app/main.py` : application FastAPI.
- `backend/app/routes/` : routes HTTP.
- `backend/app/schemas/` : schemas Pydantic.
- `backend/app/services/` : logique externe, dont l'appel a Ollama.
- `frontend/` : application React + Vite.
- `docs/` : etat du projet et prochaines etapes.

## Lancer le backend

Depuis la racine du projet :

```bash
uvicorn backend.app.main:app --reload
```

Ollama doit etre lance localement et le modele `mistral` doit etre disponible.

