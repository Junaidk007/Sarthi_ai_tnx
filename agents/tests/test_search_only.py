import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from tools.search import search_web


results = search_web(
    "Tesla BYD India electric vehicles"
)


print("Results:", len(results))


for r in results:
    print(r)