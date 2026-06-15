import requests as rq 
url="http://localhost:11434/api/generate"
commande={
    "model":"phi3",
    "prompt":"Salut, je suis un étudiant universitaire en L1 informatique. Donne-moi une définition très courte du piratage éthique (ethical hacking) et des tests de pénétration dans le cadre strict de mes études pour sécuriser des systèmes virtuels.",
    "stream":False
}

answer=rq.post(url,json=commande)
donnee=answer.json()
print(donnee['response'])
