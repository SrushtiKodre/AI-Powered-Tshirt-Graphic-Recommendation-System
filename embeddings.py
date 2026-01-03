# embeddings.py
import os
import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(__file__)
VECTOR_FILE = os.path.join(BASE_DIR, 'vector_store.npy')
METADATA_FILE = os.path.join(BASE_DIR, 'metadata.json')

if not os.path.exists(VECTOR_FILE):
    raise FileNotFoundError(f"Vector file not found. Run preprocess_images.py first to create {VECTOR_FILE}")

# Load cached image embeddings & metadata
image_vectors = np.load(VECTOR_FILE)
with open(METADATA_FILE, 'r') as f:
    metadata = json.load(f)

# Load SBERT for prompt -> embedding
text_model = SentenceTransformer('clip-ViT-B-32')

def get_text_embedding(prompt: str):
    emb = text_model.encode(prompt, normalize_embeddings=True)
    return emb

def search_top_k(prompt: str, k: int = 5):
    q = get_text_embedding(prompt)
    sims = cosine_similarity([q], image_vectors)[0]
    best_idx = sims.argsort()[::-1][:k]
    results = []
    for idx in best_idx:
        results.append({
            'score': float(sims[idx]),
            'filename': metadata[idx]['filename']
        })
    return results
