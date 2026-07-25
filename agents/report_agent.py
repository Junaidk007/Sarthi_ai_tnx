from tools.llm import generate


class ReportAgent:


    def run(self, query, analysis, recommendations, sources):


        prompt = f"""

You are a professional research report generator.

Create a final response for the user.

User Query:
{query}


Analysis:
{analysis}


Recommendations:
{recommendations}


Sources:
{sources}


IMPORTANT:
Return ONLY this format:


Executive Summary:
(brief overview)


Key Insights:
- point 1
- point 2
- point 3


Recommendations:
- recommendation 1
- recommendation 2


Sources:
- source list


Confidence Score:
(number between 0-100%)


Make it clear and human readable.

"""


        response = generate(prompt)


        return response
