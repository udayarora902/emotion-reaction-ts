A simple web app where users can enter a short text reflection and get a mock emotion analysis.


- Frontend: React + TypeScript (Vite)
- Backend: FastAPI (Python)
- Clean mobile-first UI with emotion + emoji
- Mocked emotion analysis (random output)

Getting Started

Backend 
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

Frontend 
cd frontend
npm install
npm run dev
