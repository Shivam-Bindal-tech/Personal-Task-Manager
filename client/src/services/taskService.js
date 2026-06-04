/**
 * client/src/services/taskService.js
 * 
 * Purpose:
 * This file is our dedicated API service layer.
 * All HTTP requests to our Express backend are located here.
 * React components will import these functions instead of calling Axios directly.
 * 
 * Key Concepts:
 * - Axios: A promise-based HTTP client for making API requests.
 * - API Proxy: Since we configured a proxy in vite.config.js, we can write
 *   '/api/tasks' instead of 'http://localhost:5000/api/tasks'.
 * - Clean Exports: Exporting modular functions for each CRUD action.
 */

import axios from 'axios';

// Base URL for task API endpoints.
// Vite's proxy will forward this to http://localhost:5000/api/tasks
const BASE_URL = '/api/tasks';

/**
 * Fetch all tasks from the backend.
 * @returns {Promise<Array>} List of tasks sorted by the backend.
 */
export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    // Axios puts the server's response body in response.data
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks in service:', error.message);
    // Throw the error so the calling component can catch it and show an error UI
    throw error;
  }
};

/**
 * Create a new task.
 * @param {Object} taskData - Object containing { title, description, dueDate }.
 * @returns {Promise<Object>} The newly created task object.
 */
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task in service:', error.message);
    throw error;
  }
};

/**
 * Update an existing task's details.
 * @param {string} id - The ID of the task to update.
 * @param {Object} taskData - Object containing updated { title, description, dueDate }.
 * @returns {Promise<Object>} The updated task object.
 */
export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id} in service:`, error.message);
    throw error;
  }
};

/**
 * Toggle a task's status between completed and active.
 * @param {string} id - The ID of the task to toggle.
 * @returns {Promise<Object>} The updated task object with the toggled completion status.
 */
export const toggleTaskStatus = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling task ${id} status in service:`, error.message);
    throw error;
  }
};

/**
 * Delete a task.
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object>} The backend response message and the deleted ID.
 */
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${id} in service:`, error.message);
    throw error;
  }
};
