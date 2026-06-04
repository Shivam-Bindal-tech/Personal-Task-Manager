/**
 * client/src/components/EmptyState.jsx
 * 
 * Purpose:
 * Renders a visual placeholder when there are no tasks in the current filter list.
 * Prevents the application from showing a blank, unengaging page.
 * 
 * Responsibilities:
 * - Render an illustrative icon and text guiding the user.
 * 
 * Key Concepts:
 * - Empty State Pattern: Encouraging user action when data is absent.
 */

import React from 'react';

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📂</div>
      <h3>No tasks available</h3>
      <p>Create your first task to get started on your goals!</p>
    </div>
  );
}

export default EmptyState;
