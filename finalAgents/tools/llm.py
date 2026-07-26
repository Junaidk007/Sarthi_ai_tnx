import os
import time
import sys
from groq import Groq, RateLimitError, APIError
from dotenv import load_dotenv

load_dotenv()

# Prioritized list of models to try if the primary model hits Groq Rate Limits (429)
FALLBACK_MODELS = [
    os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
    "gemma2-9b-it"
]

def generate(prompt: str) -> str:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        sys.stderr.write("[Groq LLM Error] GROQ_API_KEY is not set in environment\n")
        raise ValueError("GROQ_API_KEY is missing from environment variables")

    client = Groq(api_key=api_key)
    last_exception = None

    # Iteratively try fallback models if a RateLimitError (429) occurs
    for model_name in FALLBACK_MODELS:
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful AI research assistant."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
            )
            return response.choices[0].message.content
        except RateLimitError as e:
            sys.stderr.write(f"[Groq LLM Warning] 429 RateLimit for '{model_name}'. Retrying with next fallback model...\n")
            last_exception = e
            time.sleep(0.5)
        except APIError as e:
            sys.stderr.write(f"[Groq LLM Warning] API error for '{model_name}': {e}. Retrying with next model...\n")
            last_exception = e
            time.sleep(0.5)
        except Exception as e:
            sys.stderr.write(f"[Groq LLM Error] Unexpected error for '{model_name}': {e}\n")
            last_exception = e

    if last_exception:
        sys.stderr.write(f"[Groq LLM Fatal] All models rate-limited/failed: {last_exception}\n")
        raise last_exception

    raise RuntimeError("Failed to generate LLM response from all Groq fallback models.")
