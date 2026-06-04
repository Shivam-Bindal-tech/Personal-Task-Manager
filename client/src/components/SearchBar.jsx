/**
 * client/src/components/SearchBar.jsx
 * 
 * Purpose:
 * Renders the search input box at the top of the app, allowing users to filter tasks by title.
 * 
 * Responsibilities:
 * - Accept 'value' (the current query string) and 'onChange' (callback to update state in App.jsx).
 * - Render search and clear buttons for better UX.
 * 
 * Key Concepts:
 * - Controlled Component: The input value is tied to React state ('value'), and changes
 *   are handled by the 'onChange' callback.
 */

import React from 'react';

function SearchBar({ value, onChange }) {
  // Reset the search input to empty
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        {/* Search icon inside the input */}
        <span className="search-icon">🔍</span>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tasks by title..."
          className="search-input"
          aria-label="Search tasks by title"
        />

        {/* Show a clear button (X) only if the user has typed something */}
        {value && (
          <button 
            type="button" 
            onClick={handleClear} 
            className="clear-search-btn"
            title="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
