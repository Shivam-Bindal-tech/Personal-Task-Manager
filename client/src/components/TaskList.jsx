/**
 * client/src/components/TaskList.jsx
 * 
 * Purpose:
 * Container component that iterates through the list of tasks and displays
 * them as cards. If the list is empty, it renders the EmptyState component.
 * 
 * Responsibilities:
 * - Accept 'tasks' array, and actions 'onToggleStatus', 'onEdit', 'onDelete'.
 * - Loop over tasks using .map() and render TaskCards.
 * - Render EmptyState if tasks count is 0.
 * 
 * Key Concepts:
 * - Keys in React: Always provide a unique 'key' (like task.id) to items inside loops.
 *   This helps React update lists efficiently.
 */

import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

function TaskList({ tasks, onToggleStatus, onEdit, onDelete }) {
  // If there are no tasks in the array, render the EmptyState UI
  if (tasks.length === 0) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="task-list">
      {/* Map each task object to a TaskCard component */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id} // Essential for React rendering performance
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
