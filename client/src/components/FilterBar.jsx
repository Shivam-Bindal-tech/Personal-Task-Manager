/**
 * client/src/components/FilterBar.jsx
 * 
 * Purpose:
 * Renders filter tabs (All, Active, Completed) allowing users to switch lists.
 * It also displays task counts next to each filter for immediate visibility.
 * 
 * Responsibilities:
 * - Accept 'activeFilter', 'onFilterChange', and 'tasks' array.
 * - Compute count of items for each filter.
 * - Trigger 'onFilterChange' callback with 'all', 'active', or 'completed'.
 * 
 * Key Concepts:
 * - State Coordination: The selection is passed back up to App.jsx, which filters
 *   the list before rendering.
 */

import React from 'react';

function FilterBar({ activeFilter, onFilterChange, tasks = [] }) {
  // 1. Calculate counts for each filter tab
  const totalCount = tasks.length;
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = totalCount - activeCount;

  // Helper function to check if a filter tab is currently selected
  const getButtonClass = (filterName) => {
    return `filter-btn ${activeFilter === filterName ? 'active' : ''}`;
  };

  return (
    <div className="filter-bar">
      {/* 'All' Filter Button */}
      <button
        onClick={() => onFilterChange('all')}
        className={getButtonClass('all')}
        type="button"
      >
        <span>All</span>
        <span className="filter-badge badge-all">{totalCount}</span>
      </button>

      {/* 'Active' Filter Button */}
      <button
        onClick={() => onFilterChange('active')}
        className={getButtonClass('active')}
        type="button"
      >
        <span>Active</span>
        <span className="filter-badge badge-active">{activeCount}</span>
      </button>

      {/* 'Completed' Filter Button */}
      <button
        onClick={() => onFilterChange('completed')}
        className={getButtonClass('completed')}
        type="button"
      >
        <span>Completed</span>
        <span className="filter-badge badge-completed">{completedCount}</span>
      </button>
    </div>
  );
}

export default FilterBar;
