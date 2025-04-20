# English Learning Voice Chat Application

A full-stack TypeScript application for practicing English conversation using voice chat with AI.

## Features

- Voice-based conversation practice with AI
- Customizable conversation roles and contexts
- Support for different English proficiency levels
- Real-time speech-to-text and text-to-speech
- Powered by ChatGPT for natural conversations

## Tech Stack

- Frontend:
  - React + TypeScript
  - Vite
  - Web Speech API
  - TailwindCSS for styling
  
- Backend:
  - NestJS + TypeScript
  - OpenAI API (GPT-4)
  
## Prerequisites

- Node.js 16+ and npm
- OpenAI API key

## Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Add your OpenAI API key
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Development

Backend will run on http://localhost:3000
Frontend will run on http://localhost:5173

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## API Endpoints

### POST /api/chat
Request body:
```json
{
  "text": "User's speech text",
  "role": "interviewer|barista|etc",
  "level": "beginner|intermediate|advanced",
  "context": "job interview|ordering food|etc"
}
```

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Heroku)
1. Create Heroku app
2. Set environment variables
3. Deploy using Heroku CLI or GitHub integration
