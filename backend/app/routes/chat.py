from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from backend.app.schemas.chat import ChatRequest
from backend.app.services.ollama import stream_ollama_response


router = APIRouter()


@router.post("/chat")
def discussion(chat_request: ChatRequest):
    return StreamingResponse(
        stream_ollama_response(chat_request.messages),
        media_type="text/plain",
    )

