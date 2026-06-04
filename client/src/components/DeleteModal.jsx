/**
 * client/src/components/DeleteModal.jsx
 * 
 * Purpose:
 * Renders a confirmation dialog asking the user to verify a task deletion.
 * This prevents users from accidentally deleting tasks.
 * 
 * Responsibilities:
 * - Render an overlay screen blocking other interactions.
 * - Display the title of the task scheduled for deletion.
 * - Call 'onConfirm' or 'onCancel' depending on user choice.
 * 
 * Key Concepts:
 * - Accessibility & UX: Providing clear visual distinction for destructive actions.
 */

import React from 'react';

function DeleteModal({ task, onConfirm, onCancel }) {
  // If no task is selected for deletion, don't render anything
  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Warning Icon and Header */}
        <div className="modal-header">
          <span className="warning-icon">⚠️</span>
          <h2>Delete Task</h2>
        </div>
        
        {/* Modal Message */}
        <div className="modal-body">
          <p>Are you sure you want to delete this task?</p>
          <p className="task-delete-preview">"{task.title}"</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
          
          <button 
            type="button" 
            onClick={() => onConfirm(task.id)} 
            className="btn btn-danger"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
