/**
 * server/routes/taskRoutes.js
 * 
 * Purpose:
 * This file defines the API endpoints (URLs) for tasks and maps them to
 * the correct controller function that contains the logic.
 * 
 * Key Concepts:
 * - express.Router(): Organizes routing rules in a modular way.
 * - HTTP Methods: GET (read), POST (create), PUT (update), PATCH (partial update), DELETE (remove).
 * - Parameters (e.g., :id): Dynamic values inside URL paths accessible via req.params.
 */

const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
} = require('../controllers/taskController');

// Define routes relative to the mounted base path (e.g., /api/tasks)

// 1. GET /api/tasks - Retrieve all tasks
router.get('/', getTasks);

// 2. POST /api/tasks - Create a new task
router.post('/', createTask);

// 3. PUT /api/tasks/:id - Update an existing task's title, description, and dueDate
router.put('/:id', updateTask);

// 4. PATCH /api/tasks/:id/status - Toggle a task's status between complete and incomplete
router.patch('/:id/status', toggleTaskStatus);

// 5. DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

// Export the router so it can be used by server.js
module.exports = router;
