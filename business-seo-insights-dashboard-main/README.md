# GrowthProAI Business Dashboard

A simple full-stack project simulating how small businesses can view their SEO content and Google Business data. Built for the GrowthProAI Full Stack Intern Assignment.

## Features

- Responsive dashboard (React + Tailwind CSS)
- Input form for business name and location
- Simulated Google rating and review count
- SEO headline generation and regeneration
- Clean, mobile-friendly UI
- Node.js + Express backend with REST API

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Lucide Icons
- Backend: Node.js, Express

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd business-seo-insights-dashboard-main
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

### Running the App

_To start both frontend and backend together:_

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

**To run separately:**

- In one terminal:
  ```bash
  cd backend
  npm start
  ```
- In another terminal:
  ```bash
  cd frontend
  npm run dev
  ```

## API Endpoints

- `POST /business-data` — Returns simulated rating, reviews, and SEO headline
- `GET /regenerate-headline?name=...&location=...` — Returns a new SEO headline
- `GET /health` — Backend health check

## Project Structure

```
root/
  frontend/   # React app
  backend/    # Express server
  README.md
  ...
```

## Notes

- All data is simulated; no real business data is used.
- This project is for demonstration and assignment purposes only.

---

**Created by Amruth for GrowthProAI**
