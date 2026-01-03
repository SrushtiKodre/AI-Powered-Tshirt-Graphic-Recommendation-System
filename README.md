# AI-Powered-Tshirt-Graphic-Recommendation-System
Tshirtify is an AI-powered semantic retrieval system that recommends T-shirt graphics from free-text prompts. Using OpenAI’s CLIP model, it maps text and images into a shared embedding space and ranks designs via cosine similarity. It works in a zero-shot, label-free manner without manual tagging or supervised training.

# T-Shirt Recommender - Local Setup

## Backend
1. Open a terminal in `backend/`.
2. Create virtualenv and activate it:
   - Linux/macOS: `python -m venv venv && source venv/bin/activate`
   - Windows: `python -m venv venv && venv\Scripts\activate`
3. Install dependencies:
   ```bash
   pip install -r app/requirements.txt
   ```
4. Put your 100 images under `backend/dataset/` organized in folders (anime, minimal, nature, retro, quotes).
5. Run preprocessing (this computes CLIP image embeddings):
   ```bash
   cd app
   python preprocess_images.py
   ```
6. Start backend:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Frontend
1. Open another terminal in `frontend/`.
2. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```
3. Open `http://localhost:3000` and type prompts to generate recommendations.
