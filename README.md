# 📅 Personal Task Manager

A beautiful, lightweight, and educational **Full-Stack Task Manager** built with a **React + Vite** frontend and a **Node.js + Express.js** backend. It uses a local JSON file database, making it easy to run without any database setup!

---

## 🔗 Live Demo Link

*   **Frontend (Vercel)**: *[View Live Frontend (Coming Soon!)](https://your-frontend.vercel.app)*
*   **Backend API (Render)**: *[View Deployed API (Coming Soon!)](https://your-backend.onrender.com)*

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
| :--- | :--- | :--- |
| • React (Vite template)<br>• React Hooks (`useState`, `useEffect`) <br>• Axios (API Layer)<br>• Glassmorphism CSS | • Node.js & Express.js<br>• `cors` (configured for production)<br>• `uuid` (unique IDs) | • JSON File storage<br>• Async `fs/promises` |

---

## ⚡ How To Run Locally

### ⚙️ Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 🚀 Setup & Execution

1. **Start the Backend Server**
   ```bash
   cd server
   npm install
   npm start
   ```
   *Note: On Windows PowerShell, if script execution is blocked, use `npm.cmd install`.*

2. **Start the React Frontend** (In a new terminal window)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *Note: On Windows PowerShell, if script execution is blocked, use `npm.cmd install`.*

Once running, open **[http://localhost:5173/](http://localhost:5173/)** in your browser!

---

## 📡 API Documentation

All routes are mounted relative to `http://localhost:5000/api/tasks`.

<details>
<summary><b>🔍 View API Documentation</b></summary>

| Endpoint | Method | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | Get all tasks (newest first) | None |
| `/` | `POST` | Create a new task | `{"title": "Title", "description": "...", "dueDate": "YYYY-MM-DD"}` |
| `/:id` | `PUT` | Edit task details | `{"title": "Title", "description": "...", "dueDate": "YYYY-MM-DD"}` |
| `/:id/status` | `PATCH` | Toggle task completion status | None |
| `/:id` | `DELETE` | Delete a task | None |

</details>

---

## 📂 Project Structure

```text
personal-task-manager/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── services/           # Axios API service layers
│   │   ├── styles/             # Application styles
│   │   └── App.jsx             # Main container managing state
│   ├── vercel.json             # Vercel SPA routing config
│   └── .env.example            # Environment variables template
└── server/                     # Express Backend
    ├── controllers/            # Controller logic (handles JSON read/write)
    ├── routes/                 # API routes
    ├── utils/                  # File handler utilities
    ├── server.js               # Express server entry point
    └── .env.example            # Environment variables template
```

---

## 🔮 Next Steps / Future Improvements

*   🗄️ **Persistent Database**: Replace JSON storage with a real database like MongoDB or PostgreSQL.
*   🔐 **User Accounts**: Add sign-up, sign-in, and JWT authentication for multi-user task tracking.
*   🏷️ **Categories & Priorities**: Add task tagging, categories, and priority levels (High/Medium/Low).
*   🌓 **Theme Toggle**: Enable toggling between glassmorphic dark mode and a sleek light mode.
