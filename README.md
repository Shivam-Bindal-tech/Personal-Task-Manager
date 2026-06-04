# 📅 Personal Task Manager

A beautiful, lightweight, and educational **Full-Stack Task Manager** built with a **React + Vite** frontend and a **Node.js + Express.js** backend. It uses a local JSON file database, making it easy to run without any database setup!

🚀 **Live Demo**: *[View Live Application (Coming Soon!)](https://github.com/Shivam-Bindal-tech/Personal-Task-Manager)*

---

## 🤖 About the Developer & Build

This project was built with the help of **Antigravity**, an AI coding assistant.

As the developer:
*   💪 I have a solid understanding of **HTML, CSS, and JavaScript**.
*   🚀 I am currently learning **React** to build modern, interactive, and responsive user interfaces.

---

## ✨ Features

*   **📅 Easy Task Management**: Add, edit, delete, and toggle tasks.
*   **📊 Live Statistics Panel**: Track total, active, and completed tasks with a sleek progress bar.
*   **⚠️ Overdue Alerts**: Tasks past their due date automatically highlight in red.
*   **🔍 Search & Filters**: Search in real-time or filter tasks using *All*, *Active*, or *Completed* tabs.
*   **🎨 Glassmorphic UI**: High-fidelity dark mode with frosted-glass panels, glowing accents, and smooth transitions.
*   **💾 Lightweight JSON Storage**: Automatically saves data to a local file database.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
| :--- | :--- | :--- |
| • React (Vite template)<br>• React Hooks (`useState`, `useEffect`) <br>• Axios (API Layer)<br>• Glassmorphism CSS | • Node.js & Express.js<br>• `cors`<br>• `uuid` (unique IDs) | • JSON File storage<br>• Async `fs/promises` |

---

## 📂 Project Structure

```text
personal-task-manager/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Form, Stats, Cards, Modals)
│   │   ├── services/           # Axios API service layers
│   │   ├── styles/             # Application styles (CSS Variables & glassmorphism)
│   │   └── App.jsx             # Main container managing state
└── server/                     # Express Backend
    ├── controllers/            # Controller logic (handles JSON read/write)
    ├── routes/                 # API routes
    ├── utils/                  # File handler utilities
    └── server.js               # Express server entry point
```

---

## ⚡ Quick Start

### ⚙️ Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 🚀 Running the App

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

## 📡 API Endpoints

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

## 🎓 Learning Notes

<details>
<summary><b>💡 Click to view core patterns in this codebase</b></summary>

### 1. Frontend Proxying (`vite.config.js`)
Configured to forward `/api` requests to `http://localhost:5000` to avoid CORS issues.

### 2. State Lifting & Derived State
State is managed in `App.jsx` and passed down. Values like progress percentage are calculated on the fly (derived state) to keep data in sync.

### 3. Service Layer separation
API calls are isolated in `taskService.js` to keep components clean.

### 4. Safe Asynchronous File Manipulation
Uses `fs/promises` for async file reads/writes, creating `tasks.json` automatically if missing.

</details>

---

## 🔮 Next Steps & Future Improvements

*   🗄️ **Persistent Database**: Replace JSON storage with a real database like MongoDB or PostgreSQL.
*   🔐 **User Accounts**: Add sign-up, sign-in, and JWT authentication for multi-user task tracking.
*   🏷️ **Categories & Priorities**: Add task tagging, categories, and priority levels (High/Medium/Low).
*   🌓 **Theme Toggle**: Enable toggling between glassmorphic dark mode and a sleek light mode.

---

## 🛠️ Troubleshooting

<details>
<summary><b>🔧 View common issues & solutions</b></summary>

*   **Problem: Network Error / CORS errors in the Browser console.**
    *   *Fix*: Ensure the Express backend terminal is running on port 5000.
*   **Problem: PowerShell errors: "running scripts is disabled on this system".**
    *   *Fix*: Use `npm.cmd` instead of `npm` (e.g. `npm.cmd install`).
*   **Problem: Port 5000 or 5173 is already in use.**
    *   *Fix*: Close the other running terminals or modify the port configurations.

</details>

