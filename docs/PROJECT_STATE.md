# Etat du projet NEXUS

## Statut general

- Le repository GitHub existe.
- Le premier commit a ete pousse.
- Le projet a ete reorganise avec une separation simple entre backend, frontend et documentation.
- Le chat fonctionne maintenant entre le frontend React et le backend FastAPI.
- Le MVP chat local est maintenant utilisable.
- La V1 locale est fonctionnellement complete, mais elle n'est pas encore une version deployee ni une interface finale.
- La V2 Phase 0 a commence avec un nettoyage leger du frontend et de l'identite visuelle.
- Un prompt système NEXUS existe dans `backend/app/services/ollama.py`.
- Le prompt système de NEXUS a été affiné.
- Il définit NEXUS comme une IA locale personnelle, pédagogique, défensive et légale.
- Le prompt système demande maintenant à NEXUS de répondre brièvement par défaut.
- Il précise le cadre autorisé : labs CTF, machines virtuelles personnelles, applications locales, sites appartenant à Exaucé ou cibles avec permission explicite.
- Si le cadre d’autorisation est flou, NEXUS doit demander une clarification.
- Si une demande vise une cible réelle non autorisée, NEXUS doit refuser et rediriger vers une approche défensive, légale ou pédagogique.

## Backend

- Le backend FastAPI se trouve dans `backend/app/`.
- `backend/app/main.py` cree l'application FastAPI.
- FastAPI expose actuellement `GET /` et `POST /chat`.
- `GET /` retourne `{"status": "NEXUS online"}`.
- `POST /chat` accepte maintenant un JSON de forme `{ messages: [...] }`.
- Chaque message a la forme `{ role: "user" | "assistant" | "error", content: "..." }`.
- `POST /chat` appelle Ollama local sur `http://localhost:11434/api/generate`.
- Le modele Ollama utilise par le backend est toujours `mistral`.
- Ollama utilise `options: { num_predict: 160 }` pour limiter la longueur des reponses.
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
- Le frontend envoie les derniers messages recents avec `recentChat = convWithUser.slice(-10)`.
- Le body envoye est un JSON de forme `{ messages: [...] }`.
- Le frontend lit la reponse progressivement avec `response.body.getReader()` et `TextDecoder`.
- Les reponses de NEXUS s'affichent progressivement dans l'interface.
- Les messages sont stockes dans l'etat React `messages`.
- Les messages sont des objets avec `role` et `content`.
- Les roles actuellement utilises sont `user`, `assistant` et `error`.
- Un etat `isLoading` existe.
- Pendant l'attente de reponse, l'interface affiche un message de chargement.
- Le bouton d'envoi est desactive pendant le chargement.
- Les messages ont des classes CSS basees sur leur role : `message user`, `message assistant`, `message error`.
- L'interface affiche des bulles de chat basiques.
- Les messages affichent un label lisible : `Moi` pour `user`, `NEXUS` pour `assistant`, et `Erreur` pour les autres cas.
- Pendant l'attente, l'interface affiche `Nexus réfléchit...`.
- La zone de saisie a ete legerement amelioree.
- Le bouton d'envoi utilise une icone/fleche simple.
- Pendant `isLoading`, le bouton d'envoi affiche un spinner CSS.
- Le frontend affiche maintenant un bouton Stop pendant `isLoading`.
- Le bouton Stop est style plus proprement.
- Le bouton Stop utilise `AbortController`.
- `useRef` stocke le controller actif avec `abortControllerRef`.
- `fetch` recoit `signal: controller.signal`.
- Quand l'utilisateur clique sur Stop, la requete frontend est annulee avec `abortControllerRef.current.abort()`.
- L'erreur `AbortError` est geree sans afficher le message indiquant que le backend est indisponible.
- La ref est nettoyee apres succes, erreur ou annulation.
- En cas d'echec de connexion au backend, l'interface affiche un message clair indiquant de verifier que FastAPI est lance sur `http://127.0.0.1:8000`.
- `handleSend` contient une garde logique pour eviter un nouvel envoi si `isLoading` est deja actif.
- Le build frontend passe avec `npm run build`.
- Les anciens assets inutilisés du template Vite/React ont été nettoyés.
- Le titre HTML de l’application est maintenant `NEXUS`.
- La langue du document HTML est maintenant `fr`.
- Le frontend a maintenant un header de marque avec une petite marque animee en CSS.
- Cette marque est temporaire et ne represente pas encore un logo final.
- Le favicon temporaire est conservé en attendant une identité visuelle NEXUS définitive.
- L'interface affiche un état vide quand messages.length est à 0, avec un message d'accueil.
- Une ref messagesEndRef cible un élément invisible en bas de la chat-box.
- Un useEffect déclenché sur changement de messages fait défiler automatiquement vers cet élément avec scrollIntoView.
- V2 Phase 1 est partiellement avancée (état vide + auto-scroll faits ; sidebar et conversations pas encore).
- L'état React `conversations` contient une liste d'objets `{ id, messages }`, et `activeId` indique la conversation ouverte.
- Les messages affichés sont retrouvés à chaque rendu en cherchant dans `conversations` celle dont l'id correspond à `activeId` (repli sur une liste vide si aucune correspondance).
- Les mises à jour de messages (envoi, streaming, erreur) modifient la conversation concernée dans la liste en recopiant l'objet, sans mutation sur place.
- Au démarrage, `conversations` est initialisé depuis localStorage via une fonction d'initialisation useState, protégée par try/catch, avec repli sur une liste contenant une conversation vide si la donnée est absente ou corrompue.
- Un useEffect sur `conversations` sauvegarde la liste dans localStorage à chaque changement.
- Une zone History affiche la liste des conversations sous forme d'éléments cliquables.
- Cliquer sur une conversation la rend active via `setActiveId`.
- Un bouton "+" cree une nouvelle conversation via `handleNewConv` (id genere avec `crypto.randomUUID()`), qui devient aussitot active.

## Arborescence resumee

- `backend/app/main.py` : point d'entree FastAPI.
- `backend/app/routes/` : routes HTTP, dont `POST /chat`.
- `backend/app/schemas/` : schemas Pydantic.
- `backend/app/services/` : logique externe, dont l'appel a Ollama.
- `backend/requirements.txt` : dependances Python minimales.
- `frontend/` : app React + Vite avec formulaire de chat fonctionnel.
- `docs/` : etat du projet et prochaines etapes.

## Limites actuelles

- La memoire actuelle est une memoire de session recente, non persistante.
- Pas encore de memoire persistante.
- Pas encore de SQLite.
- Pas encore de RAG.
- Pas encore de LangChain.
- Pas encore de vraie interface finale.
- Pas encore de refonte UI complete.
- Le deploiement n'est pas prioritaire pour l'instant.
- Le backend n'a pas ete modifie pour la brique Stop.
- Le backend n'a pas ete modifie pour l'amelioration de la zone de saisie.
- Le backend n'a pas ete modifie pendant le demarrage de la V2 Phase 0.

## Decisions techniques

- Pas de base de donnees pour l'instant.
- L'historique reste temporairement dans `useState` avec une memoire de session recente.
- La liste des conversations est persistée dans localStorage sous la clé nexus_conversations.
- SQLite sera envisage seulement quand le chat sera stable.
- ChromaDB et la memoire intelligente/RAG viendront beaucoup plus tard.
- Le design avance, le mode sombre/clair, la memoire persistante et les modules avances restent des etapes futures.
- L'identite avancee de NEXUS sera ajoutee plus tard via un prompt systeme et/ou une configuration backend.

## Contraintes conservees

- Pas de LangChain.
- Pas de Docker.
- Pas de base de donnees.
- Pas d'authentification.
- Pas de ChromaDB/RAG maintenant.
