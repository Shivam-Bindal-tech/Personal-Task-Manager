/**
 * client/src/components/TaskCard.jsx
 * 
 * Purpose:
 * Renders a single task card with its details (title, description, due date, status)
 * and interactive buttons to modify it.
 * 
 * Responsibilities:
 * - Render task data.
 * - Calculate if a task is overdue and apply highlight styles.
 * - Wire up action buttons to trigger App.jsx state modifications.
 * 
 * Key Concepts:
 * - Overdue logic: 'dueDate && dueDate < todayDate && !completed'.
 * - Dynamic classes: Concatenating styling classes based on status.
 */

import React from 'react';

function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const { id, title, description, dueDate, completed } = task;

  // 1. Calculate if the task is overdue.
  // We compare dates in YYYY-MM-DD format.
  // We fetch today's date in local time by converting and splitting the ISO string.
  const getLocalDateString = () => {
    const localDate = new Date();
    // Offset local timezone to get correct local date string
    const offsetMs = localDate.getTimezoneOffset() * 60 * 1000;
    const localISOTime = new Date(localDate.getTime() - offsetMs).toISOString();
    return localISOTime.split('T')[0];
  };

  const todayDateStr = getLocalDateString();
  
  // Overdue condition:
  // - There is a due date
  // - Due date is strictly before today
  // - Task is not completed
  const isOverdue = dueDate && dueDate < todayDateStr && !completed;

  // 2. Build CSS class names dynamically based on the state of the task
  let cardClass = 'task-card';
  if (completed) {
    cardClass += ' completed-task';
  } else if (isOverdue) {
    cardClass += ' overdue-task';
  }

  return (
    <div className={cardClass} id={`task-${id}`}>
      {/* Top Header section containing title and checkbox */}
      <div className="task-card-header">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleStatus(id)}
            aria-label={`Toggle completion for ${title}`}
          />
          <span className="checkmark"></span>
        </label>
        
        <h3 className="task-title-text">{title}</h3>
      </div>

      {/* Task Description */}
      <div className="task-card-body">
        {description ? (
          <p className="task-description">{description}</p>
        ) : (
          <p className="task-description no-desc">No description provided.</p>
        )}
      </div>

      {/* Footer section containing date, badges, and action buttons */}
      <div className="task-card-footer">
        <div className="task-meta">
          {/* Due Date Indicator */}
          {dueDate ? (
            <span className={`due-date-badge ${isOverdue ? 'overdue-badge' : ''}`}>
              📅 Due: {dueDate}
            </span>
          ) : (
            <span className="due-date-badge no-due">📅 No due date</span>
          )}

          {/* Overdue Badge */}
          {isOverdue && (
            <span className="badge badge-danger">⚠️ Overdue</span>
          )}

          {/* Status Badge */}
          {completed ? (
            <span className="badge badge-success">Completed</span>
          ) : (
            <span className="badge badge-warning">Active</span>
          )}
        </div>

        {/* Action button container */}
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="action-btn edit-btn"
            title="Edit Task"
            type="button"
          >
            ✏️ Edit
          </button>
          
          <button
            onClick={() => onDelete(task)}
            className="action-btn delete-btn"
            title="Delete Task"
            type="button"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
