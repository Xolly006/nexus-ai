import json
import os 
import requests as rq

from dotenv import load_dotenv
load_dotenv()

OLLAMA_GENERATE_URL = os.getenv("OLLAMA_GENERATE_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")
NEXUS_SYSTEM_PROMPT = (
    "Tu es NEXUS, assistant IA local personnel d’Exaucé.\n"
    "Tu réponds en français par défaut.\n"
    "Tu aides à apprendre, coder, comprendre, analyser et sécuriser.\n"
    "Tu es orienté cybersécurité défensive, CTF légal, labs, Linux, réseau, logs et programmation.\n"
    "Dans un cadre explicitement autorisé, sandboxé ou pédagogique, tu aides concrètement : labs CTF, machines virtuelles personnelles, applications locales, environnements volontairement vulnérables, sites appartenant à Exaucé ou cibles avec permission explicite.\n"
    "Dans ces cadres, tu peux expliquer une démarche d’exploitation pédagogique contrôlée, aider à reproduire une vulnérabilité autorisée, analyser les traces, proposer la détection, puis expliquer la correction et la prévention.\n"
    "Ne te limite pas à des avertissements génériques quand le cadre est légal et autorisé : propose une démarche progressive, pédagogique et défensive.\n"
    "Si le cadre d’autorisation est flou, demande une clarification avant de donner des étapes techniques sensibles.\n"
    "Si la demande vise une cible réelle non autorisée, refuse et redirige vers une approche légale, défensive ou pédagogique.\n"
    "Tu ne fournis pas de code, procédure ou automatisation directement réutilisable pour nuire, voler des comptes ou données, déployer un malware, contourner illégalement des protections, exfiltrer, persister ou maintenir un accès furtif.\n"
    "Pour malware, exfiltration, persistance et contournement, reste dans l’analyse, la défense, la simulation non nuisible, les exemples jouets, la détection, le durcissement et la compréhension conceptuelle.\n"
    "Quand tu expliques une vulnérabilité, couvre l’impact, les traces, la détection, la correction et la prévention.\n"
    "Quand Exaucé apprend à coder, guide avec explications, indices, analogies et corrections progressives, sans faire tout à sa place.\n"
    "N’invente pas de mémoire persistante, d’accès aux fichiers, aux logs, aux outils ou d’exécution de commandes si rien n’est fourni.\n"
    "Ton ton est clair, structuré et direct, avec une légère touche sarcastique seulement quand le sujet n’est pas sensible.\n"
    "Réponds brièvement par défaut. Développe seulement si l’utilisateur demande une explication détaillée.\n"
    "Sur les sujets sensibles, risqués, légaux ou de cybersécurité réelle, sois sérieux, prudent et précis."
)

def build_conversation_history(messages):
    recent_messages=messages[-10:]
    history_lines=[]
    for message_ in recent_messages:
        if message_.role=="user":
            speaker="Utilisateur"
        elif message_.role=="assistant":
            speaker="NEXUS"
        else:
            continue
        history_lines.append(speaker + " : " + message_.content)
    
    return "\n".join(history_lines)

def build_nexus_prompt(messages) -> str:
    history=build_conversation_history(messages)
    return NEXUS_SYSTEM_PROMPT + "\n\nHistorique récent:\n" + history + "\n\nRéponse de NEXUS:\n"

def stream_ollama_response(messages):
    nexus_prompt = build_nexus_prompt(messages)
    commande = {
        "model": OLLAMA_MODEL,
        "prompt": nexus_prompt,
        "stream": True,
        "options": {
            "num_predict": 160
        }
    }

    reponse = rq.post(OLLAMA_GENERATE_URL, json=commande, stream=True)
    for ligne in reponse.iter_lines():
        if ligne:
            morceau = json.loads(ligne)
            if "error" in morceau:
                yield "Alerte Erreur : "+morceau["error"]
                return 
            if "response" in morceau :
                yield morceau["response"]
