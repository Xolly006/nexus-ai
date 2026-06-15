import json

import requests as rq


OLLAMA_GENERATE_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "mistral"


def stream_ollama_response(prompt: str):
    commande = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": True,
    }

    reponse = rq.post(OLLAMA_GENERATE_URL, json=commande, stream=True)
    for ligne in reponse.iter_lines():
        if ligne:
            morceau = json.loads(ligne)
            yield morceau["response"]

