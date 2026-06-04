/**
 * server/server.js
 * 
 * Purpose:
 * The entry point for our Express backend. It bootstraps the server,
 * applies middleware like CORS and JSON parsing, registers our API routes,
 * and starts listening for HTTP requests.
 * 
 * Key Concepts:
 * - Express App Initialization: Creating the server instance.
 * - Middleware (cors, express.json): Intercepting and preparing requests.
 * - Routing: Directing requests to the appropriate route files.
 * - Listening: Running the server on a specific network port.
 */

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// Create the Express application instance
const app = express();

// Define the port the server will run on
// We look at system environments first, falling back to 5000 if none is set
const PORT = process.env.PORT || 5000;

// MIDDLEWARES

// 1. CORS: Enable Cross-Origin Resource Sharing.
// This allows our React frontend (running on http://localhost:5173 or similar)
// to make API calls to this backend (running on http://localhost:5000).
app.use(cors());

// 2. Express JSON: Automatically parse JSON data in the body of incoming requests.
// Without this, req.body will be undefined in our controllers.
app.use(express.json());

// API ROUTES
// Mount all task-related endpoints under the base path '/api/tasks'
app.use('/api/tasks', taskRoutes);

// FALLBACK ROUTE
// If a client requests a URL that doesn't exist, return a 404 error
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// START THE SERVER
// Tell the Express application to start listening on our specified PORT
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Personal Task Manager server is running!`);
  console.log(` Port: ${PORT}`);
  console.log(` API Base URL: http://localhost:${PORT}/api/tasks`);
  console.log(`===================================================`);
});
