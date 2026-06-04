/**
 * client/src/App.jsx
 * 
 * Purpose:
 * The main container component for the Personal Task Manager.
 * It manages the primary application state, triggers data fetching,
 * handles API errors, and orchestrates the user interface.
 * 
 * Responsibilities:
 * - Load task data from the backend when the app starts.
 * - Manage active filters (All, Active, Completed) and search query strings.
 * - Handle loading and error states for robust UX.
 * - Manage modal visibilities for Add, Edit, and Delete confirmation flows.
 * 
 * Key Concepts:
 * - useEffect: Triggers initial data load.
 * - Lifting State Up: Child components receive state and change handlers via props.
 * - Client-Side Filtering: Computes the subset of tasks to display on every render.
 */

import React, { useState, useEffect } from 'react';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus 
} from './services/taskService';

// Import our custom UI components
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteModal from './components/DeleteModal';

// Import CSS styles
import './styles/App.css';

function App() {
  // 1. STATE VARIABLES
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Modal and Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 2. LOAD TASKS ON MOUNT
  // useEffect runs once when the component is first rendered (similar to componentDidMount)
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setApiError('Failed to load tasks from server. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. API MUTATION HANDLERS

  // Handle creating a new task
  const handleCreateSubmit = async (formData) => {
    setApiError(null);
    try {
      const createdTask = await createTask(formData);
      // Update local state by prepending the new task (keeps sorted order)
      setTasks(prevTasks => [createdTask, ...prevTasks]);
      setShowAddForm(false); // Close form modal
    } catch (err) {
      setApiError('Failed to create task. Please try again.');
    }
  };

  // Handle saving edits on an existing task
  const handleEditSubmit = async (formData) => {
    if (!taskToEdit) return;
    setApiError(null);
    try {
      const updatedTask = await updateTask(taskToEdit.id, formData);
      // Map through tasks and replace the modified task
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === taskToEdit.id ? updatedTask : t)
      );
      setTaskToEdit(null); // Close edit modal
    } catch (err) {
      setApiError('Failed to update task. Please try again.');
    }
  };

  // Handle toggling task status (completed <-> active)
  const handleToggleStatus = async (id) => {
    setApiError(null);
    try {
      const updatedTask = await toggleTaskStatus(id);
      // Update state with modified task
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === id ? updatedTask : t)
      );
    } catch (err) {
      setApiError('Failed to update task status. Please try again.');
    }
  };

  // Handle final confirmation of task deletion
  const handleDeleteConfirm = async (id) => {
    setApiError(null);
    try {
      await deleteTask(id);
      // Filter out deleted task from local state
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      setTaskToDelete(null); // Close confirmation modal
    } catch (err) {
      setApiError('Failed to delete task. Please try again.');
    }
  };

  // 4. FILTERING AND SEARCHING LOGIC
  // We perform filtering dynamically on every render to ensure accuracy
  const filteredTasks = tasks.filter(task => {
    // Check if task matches the search query (case-insensitive)
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if task matches the selected filter status
    let matchesFilter = true;
    if (activeFilter === 'active') {
      matchesFilter = !task.completed;
    } else if (activeFilter === 'completed') {
      matchesFilter = task.completed;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="app-header">
        <div className="header-brand">
          <h1>📅 Personal Task Manager</h1>
          <p className="header-subtitle">Stay organized, track goals, and boost productivity</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)} 
          className="btn btn-add-header"
          title="Add a new task"
          type="button"
        >
          ➕ Add Task
        </button>
      </header>

      {/* Global Error Banner */}
      {apiError && (
        <div className="api-error-banner">
          <span className="error-text">⚠️ {apiError}</span>
          <button onClick={loadTasks} className="retry-btn" type="button">Retry</button>
          <button onClick={() => setApiError(null)} className="close-banner-btn" type="button">&times;</button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks from database...</p>
        </div>
      ) : (
        <main className="app-main">
          {/* Top Row: Statistics Dashboard */}
          <section className="dashboard-section">
            <StatsPanel tasks={tasks} />
          </section>

          {/* Controls: Search and Filter Row */}
          <section className="controls-section">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterBar 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
              tasks={tasks}
            />
          </section>

          {/* Tasks List */}
          <section className="tasks-section">
            <div className="section-header">
              <h2>
                {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Tasks 
                <span className="results-count">({filteredTasks.length})</span>
              </h2>
            </div>
            
            <TaskList 
              tasks={filteredTasks}
              onToggleStatus={handleToggleStatus}
              onEdit={setTaskToEdit}
              onDelete={setTaskToDelete}
            />
          </section>
        </main>
      )}

      {/* MODAL WINDOWS */}

      {/* 1. Add Task Form Modal */}
      {showAddForm && (
        <TaskForm 
          onSubmit={handleCreateSubmit} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}

      {/* 2. Edit Task Form Modal */}
      {taskToEdit && (
        <TaskForm 
          taskToEdit={taskToEdit}
          onSubmit={handleEditSubmit} 
          onCancel={() => setTaskToEdit(null)} 
        />
      )}

      {/* 3. Delete Confirmation Dialog Modal */}
      {taskToDelete && (
        <DeleteModal
          task={taskToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setTaskToDelete(null)}
        />
      )}

      {/* App Footer */}
      <footer className="app-footer">
        <p>Personal Task Manager • Full-Stack Developer Assessment</p>
      </footer>
    </div>
  );
}

export default App;
