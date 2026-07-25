from tools.search import search_web


class WebSearchAgent:

    def run(self, plan):

        topics = plan["search_topics"]

        all_results = []

        for topic in topics:

            results = search_web(topic)

            for item in results:
                all_results.append(item)

        return all_results
