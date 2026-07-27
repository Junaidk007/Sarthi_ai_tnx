class RetrievalAgent:
    def __init__(self):
        self.documents = []

    def build_knowledge(self, documents):
        """Store search documents for processing."""
        self.documents = documents

    def retrieve(self, query):
        """Return the search result documents directly for LLM synthesis."""
        return self.documents[:10]
