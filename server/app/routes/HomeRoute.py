from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse


from app.api.Hugging_Face_api import query_hugging_face


router = APIRouter()

GRAMMAR_MODEL_URL = (
    "https://api-inference.huggingface.co/models/vennify/t5-base-grammar-correction"
)

SUMMARIZATION_MODEL_URL = (
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
)


@router.get("/")
def Home():
    return JSONResponse(content={"user": "hello user"})


@router.post("/summary")
async def summarized_text(request: Request):
    body = await request.json()
    text = body.get("text")
    key = "summary_text"

    summarized_text = await query_hugging_face(
        SUMMARIZATION_MODEL_URL,
        payload={
            "inputs": text,
            "task": "summarization",
            "parameters": {"max_length": 750},
        },
        key=key,
    )

    return JSONResponse(content={"text": summarized_text})
