from fastapi import FastAPI

from backend.app.routes.chat import router as chat_router


app = FastAPI()


@app.get("/")
def root():
    return {"status": "NEXUS online"}


app.include_router(chat_router)

