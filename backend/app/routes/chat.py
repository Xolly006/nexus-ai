from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from backend.app.schemas.chat import UserMessage
from backend.app.services.ollama import stream_ollama_response


router = APIRouter()


@router.post("/chat")
def discussion(prompt: UserMessage):
    return StreamingResponse(
        stream_ollama_response(prompt.text),
        media_type="text/plain",
    )

