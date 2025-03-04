import os
import httpx
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("HUGGING_API_KEY")

HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}


async def query_hugging_face(model_url: str, payload: dict, key: str):
    timeout = httpx.Timeout(30.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(model_url, headers=HEADERS, json=payload)

    if response.status_code == 200:

        return response.json()[0][key]
    else:
        return "Error, Unable to process the request"
