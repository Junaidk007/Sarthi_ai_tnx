import requests
from bs4 import BeautifulSoup


def scrape_url(url):

    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Remove unnecessary elements
        for tag in soup([
            "script",
            "style",
            "nav",
            "footer"
        ]):
            tag.decompose()


        text = soup.get_text(
            separator=" ",
            strip=True
        )

        return text[:5000]


    except Exception as e:

        return f"Error scraping {url}: {str(e)}"