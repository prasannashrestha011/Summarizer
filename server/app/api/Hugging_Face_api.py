import os
import traceback
import httpx
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("HUGGING_API_KEY")

HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}


async def query_hugging_face(model_url: str, payload: dict, key: str):
    try:
        timeout = httpx.Timeout(30.0)
        async with httpx.AsyncClient(timeout=timeout) as client:
            print("Generating response....")
            response = await client.post(model_url, headers=HEADERS, json=payload)
            print(response.status_code)
            if response.status_code == 200:
                print("Response generated....")
                return response.json()[0][key]
            else:
                error_details = traceback.format_exc()
                print("Error details->", error_details)
                return "Error, Unable to process the request"
    except httpx.RequestError as e:
        # Handle network-related errors (e.g., connection errors)
        error_details = traceback.format_exc()
        print("Network error details:", error_details)
        return {"error": f"Network error: {str(e)}"}
    except Exception as e:
        # Handle any other unexpected errors
        error_details = traceback.format_exc()
        print("Unexpected error details:", error_details)
        return {"error": f"Unexpected error: {str(e)}"}
