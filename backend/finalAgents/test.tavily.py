from tools.search import search_web


results = search_web(
    "Tesla BYD India electric vehicle market"
)


print("Results:", len(results))


for r in results:

    print("\nTITLE:")
    print(r["title"])

    print("\nURL:")
    print(r["url"])

    print("\nCONTENT:")
    print(r["content"][:300])