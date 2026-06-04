/**
 * server/controllers/taskController.js
 * 
 * Purpose:
 * This file contains the logic for processing task requests (CRUD).
 * It communicates with the file handler to read/write data, handles validation,
 * and sends appropriate HTTP responses back to the client.
 * 
 * Key Concepts:
 * - Express Request & Response (req, res): Parameters representing the incoming HTTP request and outgoing response.
 * - Validation: Ensuring the client provides required fields (e.g., 'title').
 * - Sorting: Using Array.prototype.sort() to display tasks newest first.
 * - UUID: Generating random, unique IDs using the 'uuid' library.
 */

const { v4: uuidv4 } = require('uuid');
const { readTasksFromFile, writeTasksToFile } = require('../utils/fileHandler');

/**
 * Get all tasks
 * Route: GET /api/tasks
 */
async function getTasks(req, res) {
  try {
    const tasks = await readTasksFromFile();

    // Sort tasks by 'createdAt' in descending order (Newest first)
    // We compare timestamps by parsing the ISO dates to milliseconds
    const sortedTasks = tasks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Send the sorted tasks back to the client with a 200 OK status code
    return res.status(200).json(sortedTasks);
  } catch (error) {
    console.error('Error in getTasks:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve tasks.' });
  }
}

/**
 * Create a new task
 * Route: POST /api/tasks
 */
async function createTask(req, res) {
  try {
    const { title, description, dueDate } = req.body;

    // Validation: Title is required and cannot be empty or just spaces
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    const tasks = await readTasksFromFile();

    // Create the new task object
    const newTask = {
      id: uuidv4(), // Generate a unique 36-character ID
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate ? dueDate.trim() : '', // Can be empty if not provided
      completed: false, // All new tasks start as incomplete
      createdAt: new Date().toISOString() // Current date and time in ISO format
    };

    // Add the new task to our list
    tasks.push(newTask);

    // Save the updated list back to tasks.json
    await writeTasksToFile(tasks);

    // Return the newly created task with a 210 Created status code
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in createTask:', error.message);
    return res.status(500).json({ error: 'Failed to create task.' });
  }
}

/**
 * Update an existing task's details
 * Route: PUT /api/tasks/:id
 */
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    // Validation: Title is required and cannot be empty
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    const tasks = await readTasksFromFile();

    // Find the task index by its unique ID
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      // If task does not exist, return 404 Not Found
      return res.status(404).json({ error: `Task with ID ${id} not found.` });
    }

    // Keep existing immutable fields (id, completed, createdAt), update details
    const updatedTask = {
      ...tasks[taskIndex],
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate ? dueDate.trim() : ''
    };

    // Replace the old task with the updated task in the array
    tasks[taskIndex] = updatedTask;

    // Save changes to tasks.json
    await writeTasksToFile(tasks);

    // Send the updated task back to the client with 200 OK
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error in updateTask:', error.message);
    return res.status(500).json({ error: 'Failed to update task.' });
  }
}

/**
 * Toggle task completed status (Active <-> Completed)
 * Route: PATCH /api/tasks/:id/status
 */
async function toggleTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const tasks = await readTasksFromFile();

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: `Task with ID ${id} not found.` });
    }

    // Flip the completed status (true becomes false, false becomes true)
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    // Save changes to tasks.json
    await writeTasksToFile(tasks);

    // Return the updated task with 200 OK
    return res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    console.error('Error in toggleTaskStatus:', error.message);
    return res.status(500).json({ error: 'Failed to update task status.' });
  }
}

/**
 * Delete a task
 * Route: DELETE /api/tasks/:id
 */
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const tasks = await readTasksFromFile();

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: `Task with ID ${id} not found.` });
    }

    // Filter out the task with matching ID
    const updatedTasks = tasks.filter(task => task.id !== id);

    // Save the new array to tasks.json
    await writeTasksToFile(updatedTasks);

    // Send back a success message
    return res.status(200).json({ message: 'Task deleted successfully.', id });
  } catch (error) {
    console.error('Error in deleteTask:', error.message);
    return res.status(500).json({ error: 'Failed to delete task.' });
  }
}

// Export all functions so they can be mounted by the router
module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
};
