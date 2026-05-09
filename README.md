# Realtime Grid Battle

A realtime multiplayer grid application where users can capture cells on a shared board and see updates instantly.

## Features

- Realtime multiplayer updates using Socket.io
- Shared 20x20 interactive grid
- Unique user colors
- Live online users counter
- Responsive and clean UI
- Backend deployed on Render
- Frontend deployed on Vercel

## Tech Stack

### Frontend
- React
- Vite
- Socket.io Client

### Backend
- Node.js
- Express.js
- Socket.io

## Live Demo

Frontend:
https://realtime-grid-app.vercel.app/

Backend:
https://realtime-grid-app.onrender.com/

## How To Run Locally

### Clone the repository

```bash
git clone https://github.com/shyne74/realtime-grid-app.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
node server.js
```

## Project Overview

This project was built as a realtime system where multiple users can interact with the same grid simultaneously.

When a user captures a cell:
1. Frontend sends an event to backend
2. Backend updates the grid state
3. Backend broadcasts updates using Socket.io
4. All connected users receive updates instantly

## Author

Yash