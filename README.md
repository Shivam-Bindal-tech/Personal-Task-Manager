# 📅 Personal Task Manager

A beautiful, lightweight, and educational **Full-Stack Task Manager** built with a **React + Vite** frontend and a **Node.js + Express.js** backend. It uses a local JSON file database, making it easy to run without any database setup!

🚀 **Live Demo**: 
*   **Frontend (Vercel)**: *[View Live Frontend (Coming Soon!)](https://your-frontend.vercel.app)*
*   **Backend API (Render)**: *[View Deployed API (Coming Soon!)](https://your-backend.onrender.com)*

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
| • React (Vite template)<br>• React Hooks (`useState`, `useEffect`) <br>• Axios (API Layer)<br>• Glassmorphism CSS | • Node.js & Express.js<br>• `cors` (configured for production)<br>• `uuid` (unique IDs) | • JSON File storage<br>• Async `fs/promises` |

---

## 📂 Project Structure

```text
personal-task-manager/
├── client/                     # React Frontend (Vercel)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Form, Stats, Cards, Modals)
│   │   ├── services/           # Axios API service layers
│   │   ├── styles/             # Application styles (CSS Variables & glassmorphism)
│   │   └── App.jsx             # Main container managing state
│   ├── vercel.json             # Vercel SPA routing config
│   └── .env.example            # Environment variables template
└── server/                     # Express Backend (Render)
    ├── controllers/            # Controller logic (handles JSON read/write)
    ├── routes/                 # API routes
    ├── utils/                  # File handler utilities
    ├── server.js               # Express server entry point
    └── .env.example            # Environment variables template
```

---

## ⚡ Quick Start (Local Run)

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

## 🌐 Production Deployment Guide

Follow these steps to deploy the application for production.

> [!WARNING]
> **Ephemeral Storage Limitation on Render**: Since the backend uses a local JSON file (`server/data/tasks.json`) for data persistence, deploying to Render's free instance means data will reset whenever the instance spins down (after 15 minutes of inactivity) or restarts (which happens at least once a day). For a permanent production app, migrating to a database like MongoDB or PostgreSQL is recommended.

### 1. Backend Deployment (Render)

1. Create or log in to a [Render](https://render.com/) account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   *   **Name**: `personal-task-manager-backend` (or a name of your choice)
   *   **Root Directory**: `server`
   *   **Language**: `Node`
   *   **Build Command**: `npm install`
   *   **Start Command**: `npm start`
5. Expand the **Advanced** section and add the following **Environment Variables**:
   *   `PORT` = `5000` (Render sets this dynamically, but setting it ensures a fallback)
   *   `NODE_ENV` = `production`
   *   `CLIENT_URL` = `https://your-frontend-domain.vercel.app` *(You will update this once you deploy on Vercel)*
6. Click **Create Web Service**. 
7. Once deployed, copy your web service URL (e.g. `https://personal-task-manager-backend.onrender.com`).

---

### 2. Frontend Deployment (Vercel)

1. Create or log in to a [Vercel](https://vercel.com/) account.
2. Click **Add New** and select **Project**.
3. Import your GitHub repository.
4. In the configuration settings:
   *   **Framework Preset**: `Vite` (Vercel detects this automatically)
   *   **Root Directory**: Click *Edit* and select the `client` folder.
5. Expand the **Environment Variables** section and add:
   *   `VITE_API_URL` = `https://your-backend-domain.onrender.com` *(Paste the Render web service URL you copied in the previous guide)*
6. Click **Deploy**.
7. Once deployment finishes, Vercel will provide your live URL (e.g., `https://personal-task-manager.vercel.app`).
8. **CRITICAL STEP**: Copy this URL, go back to your Render backend environment variables, and update `CLIENT_URL` to match your Vercel URL. This ensures CORS is fully secured.

---

## 🔑 Environment Variables Reference

| Scope | Variable Name | Required | Description | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | `PORT` | Yes | The port the Express server listens on. | `5000` |
| **Backend** | `NODE_ENV` | Yes | Tells Express to run in production mode. | `production` |
| **Backend** | `CLIENT_URL` | Yes | The URL of your deployed Vercel frontend (safeguards CORS). | `https://task-manager.vercel.app` |
| **Frontend** | `VITE_API_URL`| Yes | The URL of your deployed Render backend (no trailing slash).| `https://task-manager-backend.onrender.com` |

---

## 🧪 Post-Deployment Testing Checklist

Use this list to verify that the application has been deployed successfully and all features work:

- [ ] **API Connection**: The app loads without showing any red API error banners at the top.
- [ ] **Add Task**: Clicking "➕ Add Task", filling the form, and submitting adds the task successfully.
- [ ] **Overdue Alert**: Adding a task with a past due date highlights it in red.
- [ ] **Toggle Status**: Clicking the checkbox toggles the task from active to completed (moves it between tabs and updates the statistics panel).
- [ ] **Edit Task**: Modifying title, description, or due date updates the task card.
- [ ] **Delete Task**: Deleting a task prompts a confirmation modal and successfully removes it.
- [ ] **Search**: Searching by title filters tasks in real-time.
- [ ] **Responsive Design**: View the app on a mobile device or inspect element (mobile viewport) to ensure cards scale correctly.

---

## 🛠️ Troubleshooting

<details>
<summary><b>🔧 View common issues & solutions</b></summary>

### 1. "Failed to load tasks from server" (CORS Issue)
*   **Cause**: The backend is rejecting requests because `CLIENT_URL` is wrong, or the frontend is hitting the wrong endpoint.
*   **Fix**: 
    1. Double-check that `VITE_API_URL` on Vercel is set to your exact Render URL (with no trailing slash).
    2. Check that `CLIENT_URL` on Render is set to your exact Vercel URL (with no trailing slash).
    3. Trigger a redeployment on both platforms after changing variables.

### 2. 404 Pages / Routing issues on Vercel
*   **Cause**: Vercel needs to be instructed to route page loads back to Vite's root template.
*   **Fix**: Ensure `client/vercel.json` exists in your repository with SPA rewrite rules.

### 3. PowerShell / Execution errors locally
*   **Cause**: Script execution policies block loading powershell-wrapped npm tasks.
*   **Fix**: Run `npm.cmd install` and `npm.cmd run dev`.

</details>

---

## 🔮 Next Steps & Future Improvements

*   🗄️ **Persistent Database**: Replace JSON storage with a real database like MongoDB or PostgreSQL.
*   🔐 **User Accounts**: Add sign-up, sign-in, and JWT authentication for multi-user task tracking.
*   🏷️ **Categories & Priorities**: Add task tagging, categories, and priority levels (High/Medium/Low).
*   🌓 **Theme Toggle**: Enable toggling between glassmorphic dark mode and a sleek light mode.
