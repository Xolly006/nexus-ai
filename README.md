# NEXUS

NEXUS est un assistant IA personnel local construit avec un backend FastAPI, un frontend React + Vite et un modele local Ollama (`mistral`).

Le projet est oriente apprentissage, IA locale et cybersécurité défensive et légale.

## Statut du projet

- V1 locale fonctionnellement complete.
- Non deployee pour l'instant.
- Interface sombre basique, encore non finale visuellement.
- Backend et frontend communiquent via `POST /chat`.
- Ollama doit tourner localement avec le modele `mistral`.

## Fonctionnalites V1

- Chat local via interface React.
- Backend FastAPI avec route `POST /chat`.
- Connexion locale a Ollama/Mistral.
- Prompt systeme NEXUS.
- Configuration via `.env`.
- Memoire de session recente avec les derniers messages.
- Reponses en streaming cote frontend.
- Reponses limitees avec `num_predict`.
- Bouton Stop avec `AbortController`.
- Interface sombre basique avec zone de saisie, spinner et bouton Stop.

## Stack technique

- Backend : FastAPI, Uvicorn, Requests, python-dotenv.
- Frontend : React, Vite.
- IA locale : Ollama avec `mistral`.
- Stockage : aucun stockage persistant pour l'instant.

## Structure du projet

```text
backend/
  app/
    main.py
    routes/
    schemas/
    services/
  requirements.txt
frontend/
  src/
  package.json
docs/
README.md
```

## Prerequis

- Python 3.12 ou compatible.
- Node.js compatible avec la version de Vite du projet.
- Ollama installe et lance localement.
- Modele `mistral` disponible dans Ollama.

Installer le modele si necessaire :

```bash
ollama pull mistral
```

## Configuration `.env`

Creer un fichier `.env` a la racine du projet :

```env
OLLAMA_GENERATE_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=mistral
```

Ces valeurs sont les valeurs par defaut utilisees par le backend.

## Lancer le backend

Depuis la racine du projet :

```bash
python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload
```

Le backend est attendu sur :

```text
http://127.0.0.1:8000
```

## Lancer le frontend

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend Vite est generalement disponible sur :

```text
http://localhost:5173
```

## Tester le build frontend

```bash
cd frontend
npm run build
```

## Limites actuelles

- Pas de deploiement pour l'instant.
- Interface non finale visuellement.
- Pas de memoire persistante.
- Pas de LangChain.
- Pas de RAG.
- Pas de ChromaDB.
- Pas de SQLite.
- Pas d'authentification.
- Pas de Docker.

## Roadmap future

- Nettoyage visuel leger de l'interface.
- README de presentation plus propre apres stabilisation finale de la V1 locale.
- Configuration plus dediee pour l'identite et le modele NEXUS.
- Eventuelle memoire persistante plus tard, seulement si le besoin est clair.

## Cadre legal / cybersécurité defensive

NEXUS est pense pour l'apprentissage, les environnements locaux et la cybersécurité defensive.

Il peut aider dans des cadres autorises : labs CTF, machines virtuelles personnelles, applications locales, environnements volontairement vulnerables, sites appartenant a Exauce ou cibles avec permission explicite.

Il n'est pas destine a attaquer des systemes reels sans autorisation, voler des comptes, exfiltrer des donnees, contourner illegalement des protections ou maintenir un acces furtif.
