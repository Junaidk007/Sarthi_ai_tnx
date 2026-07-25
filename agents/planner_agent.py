import json
from tools.llm import generate


class PlannerAgent:

    def run(self, user_query: str):

        prompt = f"""
You are the Planner Agent.

Analyse the user's request and return ONLY valid JSON.

Format:

{{
    "task_type":"",
    "search_topics":[],
    "expected_output":"report"
}}

Task Types:
- research
- comparison
- recommendation
- summarization
- decision_support

User Query:
{user_query}
"""

        response = generate(prompt)

        try:
            cleaned = response.strip()

            # Remove markdown JSON wrapper
            if cleaned.startswith("```json"):
                cleaned = cleaned.replace("```json", "")
                cleaned = cleaned.replace("```", "")
                cleaned = cleaned.strip()

            return json.loads(cleaned)

        except Exception as e:
            print("JSON parsing error:", e)
            print("Raw response:", response)

            return {
                "task_type": "research",
                "search_topics": [user_query],
                "expected_output": "report"
            }
