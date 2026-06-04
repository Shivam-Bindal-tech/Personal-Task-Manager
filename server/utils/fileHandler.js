/**
 * server/utils/fileHandler.js
 * 
 * Purpose:
 * This utility handles reading and writing task data to our local JSON file database.
 * Isolating this logic makes it reusable and keeps our controller code clean.
 * 
 * Key Concepts:
 * - fs/promises: Node.js built-in file system module using modern Promises (async/await).
 * - Error Handling: Gracefully returning empty arrays if the file doesn't exist or is corrupted.
 */

const fs = require('fs').promises;
const path = require('path');

// Resolve the absolute path to the tasks.json file.
// path.join combines folder paths, and __dirname represents the folder this utility file lives in.
const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

/**
 * Reads tasks from the tasks.json file.
 * @returns {Promise<Array>} An array of task objects.
 */
async function readTasksFromFile() {
  try {
    // Read files as text using UTF-8 encoding
    const dataText = await fs.readFile(filePath, 'utf8');
    
    // Parse the JSON text into a JavaScript array and return it
    return JSON.parse(dataText);
  } catch (error) {
    // If the file is not found (ENOENT), create it with an empty array and return it
    if (error.code === 'ENOENT') {
      console.log('tasks.json not found. Creating a new database file...');
      await writeTasksToFile([]);
      return [];
    }
    
    // If the JSON is invalid or other error occurred, log it and return an empty array
    console.error('Error reading/parsing tasks.json:', error.message);
    return [];
  }
}

/**
 * Writes tasks to the tasks.json file.
 * @param {Array} tasks - The full array of tasks to write.
 * @returns {Promise<void>}
 */
async function writeTasksToFile(tasks) {
  try {
    // Convert the JavaScript array into a readable JSON string with 2 spaces indentation
    const dataText = JSON.stringify(tasks, null, 2);
    
    // Write the string to the file
    await fs.writeFile(filePath, dataText, 'utf8');
  } catch (error) {
    console.error('Error writing to tasks.json:', error.message);
    throw new Error('Failed to save data to the file database.');
  }
}

// Export the functions so they can be imported in other backend files
module.exports = {
  readTasksFromFile,
  writeTasksToFile
};
