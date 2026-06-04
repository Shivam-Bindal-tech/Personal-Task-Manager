# Personal Task Manager 📅

A beautiful, beginner-friendly, and educational Full-Stack Task Manager application built with a **React + Vite** frontend and a **Node.js + Express.js** backend. This project utilizes a plain **JSON file** as a database, making it extremely lightweight and easy to run locally without installing heavy database systems.

This codebase was written specifically with beginner developers in mind. Every file is modular, structured according to clean-code principles, and contains extensive comments explaining the **"Why"** and **"How"** behind every design decision.

---

## 🚀 Features

### Core Features (Must-Haves)
*   **Add Tasks**: Create new tasks with a required *Title*, optional *Description*, and optional *Due Date*. Includes dynamic frontend input validation.
*   **View Tasks**: Retrieve tasks from the database, automatically sorted **Newest First**.
*   **Edit Tasks**: Modify any existing task's title, description, or due date.
*   **Toggle Task Status**: Easily switch task completion status between **Active** and **Completed** via a custom checkbox toggle.
*   **Filter Tasks**: Filter the list dynamically using tabs: *All*, *Active*, or *Completed*.

### Statistics & Layouts (Should-Haves)
*   **Statistics Panel**: Display counts of total, active, and completed tasks, plus a dynamic completion percentage bar.
*   **Overdue Highlighting**: Tasks that are incomplete and have a due date in the past are highlighted in red (red border, badge, and title) for immediate attention.
*   **Empty State UI**: Displays a clean, engaging folder placeholder graphic when no tasks match the filter.
*   **Delete Confirmation**: A custom modal pops up asking *"Are you sure you want to delete this task?"* to prevent accidental deletions.

### Bonus Features
*   **Search**: Real-time filtering of tasks by title.
*   **JSON Persistence**: Tasks are written directly to a JSON file on the server, meaning your data stays safe even if you reboot the server.
*   **Glassmorphism Dark Theme**: A modern CSS-only UI featuring frosted-glass elements, glowing accents, and smooth animations.

---

## 🛠️ Tech Stack

### Frontend
*   **React** (Vite template for fast builds)
*   **Functional Components** with **React Hooks** (`useState`, `useEffect`)
*   **Axios** for communication with the API
*   **Plain CSS** (no Tailwind, Bootstrap, or component libraries)

### Backend
*   **Node.js** & **Express.js**
*   **cors** (Cross-Origin Resource Sharing middleware)
*   **uuid** (for generating unique 36-character task IDs)

### Storage
*   **JSON File Storage** (`server/data/tasks.json` read/written asynchronously via `fs/promises`)

---

## 📂 Folder Structure

```text
personal-task-manager/
│
├── client/                     # Frontend React Project
│   ├── src/
│   │   ├── components/         # Reusable UI Elements
│   │   │   ├── DeleteModal.jsx # Confirms task removal
│   │   │   ├── EmptyState.jsx  # Displayed when tasks list is empty
│   │   │   ├── FilterBar.jsx   # Selectors for All, Active, Completed tabs
│   │   │   ├── SearchBar.jsx   # Real-time search by title
│   │   │   ├── StatsPanel.jsx  # Statistics grid & progress bar
│   │   │   ├── TaskCard.jsx    # Displays individual task details
│   │   │   ├── TaskForm.jsx    # Handles creation and modification
│   │   │   └── TaskList.jsx    # Container that loops over tasks
│   │   │
│   │   ├── services/
│   │   │   └── taskService.js  # Dedicated API layer using Axios
│   │   │
│   │   ├── styles/
│   │   │   └── App.css         # Complete app stylesheet (CSS Variables, responsive rules)
│   │   │
│   │   ├── App.jsx             # Coordinates global state and calls API
│   │   └── main.jsx            # Bootstraps React into HTML
│   │
│   ├── public/                 # Static assets (favicons, logos)
│   ├── index.html              # Main HTML mount template
│   ├── vite.config.js          # Vite config (sets up the API proxy)
│   └── package.json            # Frontend script commands & packages
│
├── server/                     # Backend Express Project
│   ├── controllers/
│   │   └── taskController.js   # Handles validation, database read/writes, and responses
│   ├── routes/
│   │   └── taskRoutes.js       # Maps URLs to controller logic
│   ├── data/
│   │   └── tasks.json          # File acting as our database
│   ├── utils/
│   │   └── fileHandler.js      # Reading & writing files safely using fs/promises
│   │
│   ├── server.js               # Starts the Express app and runs middlewares
│   └── package.json            # Backend script commands & packages
│
└── README.md                   # This instruction file
```

---

## 📡 API Documentation

All routes are mounted relative to `http://localhost:5000/api/tasks`.

### 1. Get All Tasks
*   **URL**: `/api/tasks`
*   **Method**: `GET`
*   **Response Status**: `200 OK`
*   **Response Body**: Array of task objects sorted newest first.
    ```json
    [
      {
        "id": "c0c1a202-8d16-4cbe-9bda-0c8abd9da401",
        "title": "Learn React Hooks",
        "description": "Practice useState and useEffect",
        "dueDate": "2026-03-15",
        "completed": false,
        "createdAt": "2026-06-03T08:10:12.897Z"
      }
    ]
    ```

### 2. Create Task
*   **URL**: `/api/tasks`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "title": "Practice CSS Grid",         // Required (String)
      "description": "Build layout structures", // Optional (String)
      "dueDate": "2026-06-10"               // Optional (String YYYY-MM-DD)
    }
    ```
*   **Response Status**: `201 Created` on success, `400 Bad Request` if title is missing.
*   **Response Body**: The newly created task object including auto-generated fields (`id`, `completed`, `createdAt`).

### 3. Update Task
*   **URL**: `/api/tasks/:id`
*   **Method**: `PUT`
*   **Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "title": "Practice CSS Flexbox & Grid",
      "description": "Build modern grids",
      "dueDate": "2026-06-12"
    }
    ```
*   **Response Status**: `200 OK` on success, `400 Bad Request` if title is empty, `404 Not Found` if the ID doesn't exist.
*   **Response Body**: The fully updated task object.

### 4. Toggle Status
*   **URL**: `/api/tasks/:id/status`
*   **Method**: `PATCH`
*   **Response Status**: `200 OK` on success, `404 Not Found` if ID doesn't exist.
*   **Response Body**: The updated task object with its `completed` boolean value toggled.

### 5. Delete Task
*   **URL**: `/api/tasks/:id`
*   **Method**: `DELETE`
*   **Response Status**: `200 OK` on success, `404 Not Found` if ID doesn't exist.
*   **Response Body**:
    ```json
    {
      "message": "Task deleted successfully.",
      "id": "c0c1a202-8d16-4cbe-9bda-0c8abd9da401"
    }
    ```

---

## ⚙️ Installation & Running the Code

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 📂 Setup Steps

1.  **Clone or Download the Project**:
    Extract the folders to your computer.

2.  **Install Backend Dependencies**:
    Open a terminal inside the `server/` directory and run:
    ```bash
    npm install
    # On Windows PowerShell if script execution is blocked, use:
    npm.cmd install
    ```

3.  **Install Frontend Dependencies**:
    Open a second terminal window inside the `client/` directory and run:
    ```bash
    npm install
    # On Windows PowerShell if script execution is blocked, use:
    npm.cmd install
    ```

---

### 🏃 Running the Application

For the application to work, you must start both the backend server and the frontend client.

#### 1. Start the Backend Server
Inside the `server/` folder, run:
```bash
npm start
```
The console will log:
```text
===================================================
 Personal Task Manager server is running!
 Port: 5000
 API Base URL: http://localhost:5000/api/tasks
===================================================
```
*The server will watch and read from `server/data/tasks.json` on incoming API calls.*

#### 2. Start the React Frontend
Inside the `client/` folder, run:
```bash
npm run dev
```
The terminal will display:
```text
  VITE v8.0.16  ready in 825 ms

  ➜  Local:   http://localhost:5173/
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your web browser to use the Personal Task Manager!

---

## 📡 Example API Requests (How to Test)

You can test the API directly using terminal commands or tool integrations. Here are standard commands you can run from a PowerShell terminal:

### Add a Task (POST)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Method Post -ContentType "application/json" -Body '{"title":"Learn Express Routing","description":"Map URL paths to controllers","dueDate":"2026-06-08"}'
```

### Fetch all Tasks (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Method Get
```

---

## 🛠️ Troubleshooting

*   **Problem: Network Error / CORS errors in the Browser console.**
    *   *Cause*: The Express backend is likely not running or running on the wrong port.
    *   *Fix*: Check your backend terminal window and ensure it says the server is running on port 5000.
*   **Problem: PowerShell errors: "running scripts is disabled on this system" when executing npm.**
    *   *Cause*: Windows execution policies prevent loading powershell-wrapped modules.
    *   *Fix*: Run the commands by replacing `npm` with `npm.cmd` (e.g., `npm.cmd install` and `npm.cmd run dev`).
*   **Problem: Port 5000 or 5173 is already in use.**
    *   *Cause*: Another application or a zombie Node instance is running on that port.
    *   *Fix*: Change the PORT variable inside `server/server.js` or close the other running terminals.

---

## 🎓 Learning Notes for Beginners

If you are exploring the codebase to learn, pay attention to these core patterns:

### 1. Frontend Proxying (`vite.config.js`)
Instead of typing `axios.get("http://localhost:5000/api/tasks")` in our React code, we configure a **proxy**. This tells the Vite server: *"If you see a request starting with `/api`, forward it to `http://localhost:5000` on the backend."* This keeps React code clean and prevents browser CORS blocks.

### 2. State Lifting & Derived State
In `App.jsx`, we maintain the master state `tasks`. 
*   **State Lifting**: Since both the `StatsPanel` and the `TaskList` need to know about the tasks, we keep the state in their closest common parent (`App.jsx`) and pass it down as **props**.
*   **Derived State**: We do not store `completedTasksCount` or `filteredTasks` in state! Instead, we calculate them directly during the render cycle from the `tasks` array. This is a crucial React pattern to avoid "out-of-sync" state bugs.

### 3. Separation of Concerns (Service Layer)
We created a dedicated `client/src/services/taskService.js` file. React components should only care about UI layout and local inputs. They shouldn't have to know *how* to construct Axios calls. Isolating HTTP calls in a service layer makes testing and upgrading code extremely easy.

### 4. Safe Asynchronous File Manipulation
In `server/utils/fileHandler.js`, we use `fs.promises` with `async/await`. This prevents Node's single thread from freezing during heavy disk reads, keeping the server responsive. The file handler also handles errors gracefully: if the data file is missing, it automatically creates a fresh empty array instead of crashing.
