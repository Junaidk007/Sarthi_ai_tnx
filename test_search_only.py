from tools.search import search_web


results = search_web(
    "Tesla BYD India electric vehicles"
)


print("Results:", len(results))


for r in results:
    print(r)