import faiss
import numpy as np


class VectorStore:

    def __init__(self):

        self.index = None
        self.documents = []


    def build(self, embeddings, documents):

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(
            dimension
        )

        self.index.add(
            np.array(embeddings)
        )

        self.documents = documents



    def search(self, query_embedding, k=3):

        distances, indices = self.index.search(
            np.array([query_embedding]),
            k
        )


        results = []

        for idx in indices[0]:

            results.append(
                self.documents[idx]
            )

        return results