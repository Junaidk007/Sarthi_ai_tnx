from tools.scraper import scrape_url


class ScraperAgent:


    def run(self, search_results):

        documents = []


        for item in search_results:

            content = scrape_url(
                item["url"]
            )


            documents.append({

                "title": item["title"],

                "url": item["url"],

                "content": content

            })


        return documents