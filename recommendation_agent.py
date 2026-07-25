from tools.llm import generate


class RecommendationAgent:


    def run(self, query, analysis):


        prompt = f"""

You are a strategic decision consultant.

User Query:
{query}


Analysis:
{analysis}


Based on this analysis generate:

1. Strategic Recommendations
2. Possible Actions
3. Future Opportunities
4. Potential Risks


Keep the answer practical and concise.

"""


        response = generate(prompt)


        return response