import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;
