# Plan V2 de NEXUS

## Objectif general

La V2 vise a transformer NEXUS d'un MVP local fonctionnel en assistant plus structure, plus agreable a utiliser, plus memorisant et plus extensible.

L'objectif n'est pas de lancer directement de gros outils comme LangChain, RAG, comptes utilisateurs ou modules cyber avances. La V2 doit progresser par phases propres, avec une base stable avant chaque ajout important.

## Ce qu'on garde de la V1

- Backend FastAPI.
- Frontend React/Vite.
- Ollama avec le modele `mistral`.
- Prompt systeme NEXUS.
- Configuration via `.env`.
- Memoire de session recente.
- Streaming cote React.
- Limitation des reponses.
- Bouton Stop avec `AbortController`.
- UI legere actuelle.
- README et documentation.

## Phase 0 — Nettoyage post-V1

- Supprimer les traces inutiles de Vite.
- Nettoyer les assets inutilises.
- Remplacer le favicon temporaire.
- Preparer une identite visuelle minimale NEXUS.
- Verifier `npm run build`.

## Phase 1 — UX solide

- Ajouter une sidebar simple.
- Ajouter un bouton nouvelle conversation.
- Ameliorer l'etat vide.
- Ajouter le scroll automatique vers le dernier message.
- Ameliorer les bulles et labels.
- Rendre l'interface plus propre sans refonte excessive.

## Phase 2 — Historique local

- Stocker les conversations localement.
- Commencer eventuellement avec `localStorage`.
- Preparer ensuite une transition vers SQLite.
- Pouvoir creer, renommer, supprimer et recharger une conversation.

## Phase 3 — Modes NEXUS

- Mode Mentor.
- Mode Dev.
- Mode Cyber defensif.
- Mode Analyse de logs.
- Mode Bref.
- Mode Deep analysis.
- Le mode choisi doit influencer le prompt backend et/ou les options de generation.

## Phase 4 — Backend conversations

- Ajouter une vraie structure de conversations cote backend.
- Preparer des endpoints pour conversations et messages.
- Introduire SQLite seulement quand le besoin est clair.

## Phase 5 — Auth simple

- Ajouter les comptes utilisateurs plus tard.
- Prevoir connexion et creation de compte.
- Utiliser des mots de passe hashes.
- Lier les conversations a un utilisateur.
- Ne pas prioriser cette phase avant l'historique et le backend conversationnel.

## Phase 6 — Tool layer

- Preparer les premiers outils simples.
- Ajouter une analyse de logs.
- Ajouter de la recherche defensive.
- Garder les outils cyber uniquement dans un cadre legal, local, CTF ou autorise.
- LangChain peut etre etudie ici, mais pas avant que la base soit stable.

## Phase 7 — Aegis Bridge futur

- Aegis pourra devenir un outil appele par NEXUS.
- NEXUS pourrait generer ou expliquer du code Aegis.
- Aegis devra exiger des permissions explicites.
- Aucun pont NEXUS-Aegis ne doit etre lance avant que le langage Aegis ait une syntaxe minimale, un interpreteur et un systeme de permissions.

## Phase 8 — Memoire longue duree / RAG

- Etudier ChromaDB ou un autre vector store plus tard.
- Utiliser des embeddings locaux.
- Prevoir l'ingestion de notes, docs et conversations.
- Ajouter la recherche dans les connaissances personnelles.
- Ne pas commencer cette phase avant l'historique structure.

## Hors scope immediat

- Deploiement public.
- Multi-utilisateur complet.
- RAG.
- ChromaDB.
- LangChain.
- Shodan/VirusTotal.
- Aegis integre.
- Refonte UI totale.
