# main.py - FastAPI backend
import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.embeddings import search_top_k

app = FastAPI(title='T-Shirt Recommender')

# CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Serve dataset images as static files
DATASET_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dataset'))
app.mount('/images', StaticFiles(directory=DATASET_DIR), name='images')

class PromptRequest(BaseModel):
    prompt: str
    top_k: int = 1

@app.get('/')
async def index():
    return {'status': 'tshirt-recommender backend running'}

@app.post('/api/search')
async def api_search(req: PromptRequest):
    prompt = req.prompt
    top_k = req.top_k
    results = search_top_k(prompt, k=top_k)
    for r in results:
        r['url'] = '/images/' + r['filename']
    return JSONResponse({'query': prompt, 'results': results})

# optional health endpoint
@app.get('/healthz')
async def health():
    return {'status': 'ok'}
