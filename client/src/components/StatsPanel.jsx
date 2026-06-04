/**
 * client/src/components/StatsPanel.jsx
 * 
 * Purpose:
 * Renders a visual statistics dashboard showing completed, active, and total tasks,
 * along with a progress percentage.
 * 
 * Responsibilities:
 * - Accept 'tasks' array from App.jsx.
 * - Calculate statistics dynamically.
 * - Display stats in a card grid.
 * 
 * Key Concepts:
 * - Derived Data: Rather than saving 'activeCount' in state, we calculate it dynamically
 *   from the existing 'tasks' array. This prevents sync issues.
 */

import React from 'react';

function StatsPanel({ tasks = [] }) {
  // 1. Calculate stats dynamically
  const totalTasksCount = tasks.length;
  
  // Count how many tasks have 'completed === true'
  const completedTasksCount = tasks.filter(task => task.completed).length;
  
  // Count how many tasks are active
  const activeTasksCount = totalTasksCount - completedTasksCount;
  
  // Calculate progress percentage (avoiding division by zero)
  const completionPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <div className="stats-panel">
      {/* Total Tasks Card */}
      <div className="stats-card total">
        <div className="stats-icon">📋</div>
        <div className="stats-details">
          <h3>Total Tasks</h3>
          <p className="stats-number">{totalTasksCount}</p>
        </div>
      </div>

      {/* Active Tasks Card */}
      <div className="stats-card active">
        <div className="stats-icon">⚡</div>
        <div className="stats-details">
          <h3>Active Tasks</h3>
          <p className="stats-number">{activeTasksCount}</p>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="stats-card completed">
        <div className="stats-icon">✅</div>
        <div className="stats-details">
          <h3>Completed</h3>
          <p className="stats-number">{completedTasksCount}</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="stats-card progress-card">
        <div className="stats-icon">📈</div>
        <div className="stats-details">
          <h3>Completion Rate</h3>
          <p className="stats-number">{completionPercentage}%</p>
          {/* Progress bar container */}
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
