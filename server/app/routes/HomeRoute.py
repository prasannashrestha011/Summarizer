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

PARAPHRASE_MODEL_URL = (
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
            "parameters": {"max_length": 1550, "min_length": 250},
        },
        key=key,
    )

    return JSONResponse(content={"text": summarized_text})


@router.post("/paraphase")
async def paraphase_text(request: Request):
    body = await request.json()
    text = body.get("text")
    key = "summary_text"
    paraphased_text = await query_hugging_face(
        PARAPHRASE_MODEL_URL,
        payload={
            "inputs": text,
            "task": "paraphase",
            "parameters": {
                "max_length": len(text),
                "min_length": 160,
                "temperature": 0.7,
                "top_p": 0.9,
                "num_return_sequences": 1,
            },
        },
        key=key,
    )
    return JSONResponse(content={"text": paraphased_text})
