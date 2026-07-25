import os
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()


api_key = os.getenv("TAVILY_API_KEY")

print("Tavily Key Loaded:", api_key is not None)


client = TavilyClient(
    api_key=api_key
)


def search_web(query):

    try:

        response = client.search(
            query=query,
            max_results=5
        )

        print("\nRAW RESPONSE:")
        print(response)


        results = []

        for item in response.get("results", []):

            results.append(
                {
                    "title": item.get("title"),
                    "url": item.get("url"),
                    "content": item.get("content")
                }
            )

        return results


    except Exception as e:

        print("Tavily Error:", e)

        return []