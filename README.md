# Team Task Manager

A full-stack task management application that helps teams organize tasks, track progress, and collaborate efficiently.

## Live Demo

* Frontend: [https://marvelous-peony-2bef2b.netlify.app](https://marvelous-peony-2bef2b.netlify.app)
* Backend API: [https://team-task-manager-production-3d5e.up.railway.app/](https://team-task-manager-production-3d5e.up.railway.app/)

---

# Features

* User Authentication (Login & Signup)
* Task Creation and Management
* Assign Tasks to Team Members
* Task Status Tracking
* Responsive User Interface
* Secure Backend API
* MongoDB Database Integration
* Full-Stack Deployment

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Recharts
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Deployment

* Frontend: Netlify
* Backend: Railway

---

# Project Structure

````bash
team-task-manager/
│
├── client/
│   ├── src/
│   ├── node_modules/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── package-lock.json
└── README.md
```bash
team-task-manager/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── package.json
│
└── README.md
````

---

# Installation and Setup

## Clone Repository

```bash
git clone https://github.com/rakshapabba/team-task-manager.git
cd team-task-manager
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

## Tasks

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get all tasks |
| POST   | /api/tasks     | Create task   |
| PUT    | /api/tasks/:id | Update task   |
| DELETE | /api/tasks/:id | Delete task   |

---

# Screenshots

## signup Page

Add screenshot here:https://drive.google.com/file/d/1wIJNP3Q119ygX2c-ZArnP1JF43DaIwkX/view?usp=sharing



## Login Page

Add screenshot here:https://drive.google.com/file/d/16Syq_LXHpLcOak1r-gdIWQW4RplBY2pU/view?usp=sharing

## Dashboard

Add screenshot here:https://drive.google.com/file/d/1NwEUOaJFuL3mRnagfGLFWuF3yxynMDjT/view?usp=sharing



## Task Management

Add screenshot here:https://drive.google.com/file/d/1IYGR9fxRZnexKcdm5CalU6W3BvLvvdeA/view?usp=sharing



---

# Deployment

## Frontend Deployment

* Hosted on Netlify

## Backend Deployment

* Hosted on Railway

---

# Future Enhancements

* Real-time Notifications
* Team Chat Feature
* Dark Mode
* Task Deadlines & Reminders
* File Upload Support
* Role-Based Access Control

---

# Author

Raksha Pabba

GitHub: [https://github.com/rakshapabba](https://github.com/rakshapabba)

---

# License

This project is created for assessment purpose.
