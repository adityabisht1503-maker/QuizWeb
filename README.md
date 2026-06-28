# Quiz Application

A full-stack quiz platform that enables users to register, log in, and participate in quizzes through a secure and responsive interface. The application includes authentication, session management, and anti-cheat mechanisms to provide a fair and reliable quiz experience.

---

## Features

- User registration and login
- Secure authentication and authorization
- Responsive user interface
- Take quizzes with real-time interaction
- Session management
- Anti-cheat mechanisms
- Scalable full-stack architecture

---

## Tech Stack

### Frontend
- React
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

## Project Structure

```
quiz-application/
├── backend/
└── frontend/
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/quiz-application.git
cd quiz-application
```

### Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder and add the required environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

## Running the Application

### Start the backend

```bash
cd backend
npm start
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will typically run on:

```
http://localhost:5173
```

The backend will typically run on:

```
http://localhost:3000
```

---

## Key Highlights

- Secure user authentication using JWT
- Protected routes for authorized users
- Responsive and user-friendly interface
- Custom anti-cheat features to improve quiz integrity
- RESTful API architecture
- MongoDB integration for persistent data storage

---

## Future Improvements

- Admin dashboard
- Quiz timer and leaderboard
- Detailed performance analytics
- Email verification and password reset
- Multiplayer quiz mode
- Deployment with Docker and CI/CD

---

## Author

**Aditya Bisht**
