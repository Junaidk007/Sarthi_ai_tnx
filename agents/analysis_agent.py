from tools.llm import generate


class AnalysisAgent:


    def run(self, query, documents):

        context = ""


        for doc in documents:

            context += f"""
Title: {doc['title']}

Content:
{doc['content']}

--------------------
"""


        prompt = f"""

You are an expert research analyst.

Analyze the following user query using the provided research context.

User Query:
{query}


Research Context:
{context}


Generate:

1. Main findings
2. Important comparisons
3. Market trends
4. Risks and opportunities


Give clear structured points.

"""


        response = generate(prompt)


        return response
