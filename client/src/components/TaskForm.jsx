/**
 * client/src/components/TaskForm.jsx
 * 
 * Purpose:
 * Renders a form for either adding a new task or editing an existing task.
 * Includes local state management and input validation.
 * 
 * Responsibilities:
 * - Handle input bindings for title, description, and dueDate.
 * - Detect if we are in "Edit Mode" vs "Add Mode" based on 'taskToEdit' prop.
 * - Perform input validation (title required).
 * - Render labels and inputs with descriptive, unique IDs.
 * 
 * Key Concepts:
 * - useEffect: Used to pre-fill the form fields when 'taskToEdit' changes.
 * - Resetting State: Resetting form fields to empty when switching back to Add Mode.
 */

import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, onCancel, taskToEdit = null }) {
  // 1. Local states for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Local state for validation error message
  const [validationError, setValidationError] = useState('');

  // 2. Prefill form fields if we are editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate || '');
      setValidationError(''); // Clear any previous errors
    } else {
      // If taskToEdit is null, we are in "Add Mode", so clear all inputs
      setTitle('');
      setDescription('');
      setDueDate('');
      setValidationError('');
    }
  }, [taskToEdit]);

  // 3. Handle form submission
  const handleSubmit = (e) => {
    // Prevent the default browser form reload action
    e.preventDefault();

    // Perform front-end validation
    if (!title.trim()) {
      setValidationError('Please enter a task title. This field is required.');
      return;
    }

    // Prepare form data object
    const formData = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate
    };

    // Trigger the submit callback passed by App.jsx
    onSubmit(formData);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-card">
        <h2>{taskToEdit ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
        
        <form onSubmit={handleSubmit} className="task-form">
          {/* Error Message Alert */}
          {validationError && (
            <div className="form-error-alert" id="form-validation-error">
              ⚠️ {validationError}
            </div>
          )}

          {/* Title Input (Required) */}
          <div className="form-group">
            <label htmlFor="task-title">Title <span className="required-star">*</span></label>
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setValidationError(''); // Clear error on typing
              }}
              placeholder="e.g. Learn React Routing"
              className={validationError ? 'input-error' : ''}
              maxLength={80}
            />
          </div>

          {/* Description Input (Optional) */}
          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter details about this task..."
              rows={4}
              maxLength={500}
            />
          </div>

          {/* Due Date Input (Optional) */}
          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              type="date"
              id="task-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
