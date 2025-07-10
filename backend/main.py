from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ReflectionInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze_emotion(data: ReflectionInput):
    emotions = {
        "Happy": "😊",
        "Sad": "😢",
        "Anxious": "😰",
        "Excited": "🤩",
        "Angry": "😠",
        "Calm": "😌"
    }
    emotion = random.choice(list(emotions.keys()))
    return {
        "emotion": emotion,
        "emoji": emotions[emotion],
        "confidence": round(random.uniform(0.7, 0.99), 2)
    }
