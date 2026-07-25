from tools.embeddings import create_embeddings
from tools.vector_store import VectorStore



class RetrievalAgent:


    def __init__(self):

        self.store = VectorStore()



    def build_knowledge(self, documents):

        texts = []

        for doc in documents:

            texts.append(
                doc["content"]
            )


        embeddings = create_embeddings(
            texts
        )


        self.store.build(
            embeddings,
            documents
        )



    def retrieve(self, query):

        query_embedding = create_embeddings(
            [query]
        )[0]


        results = self.store.search(
            query_embedding
        )


        return results
