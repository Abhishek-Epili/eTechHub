import React, { useState } from "react";
import "./css/reviews.css";

function ReviewFilter() {
    const [filterOption, setFilterOption] = useState("");
    const [searchText, setSearchText] = useState("");

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleDisableFilter = () => {
        // Reset filter and search
        setFilterOption("");
        setSearchText("");
    };

    return (
        <div className="review-filter-container">
            <label>Filter by:</label>
            <select value={filterOption} onChange={handleFilterChange}>
                <option value="">Select...</option>
                <option value="negative">Negative</option>
                <option value="positive">Positive</option>
                <option value="most-liked">Most Liked</option>
            </select>

            <input
                type="text"
                placeholder="Search with header"
                value={searchText}
                onChange={handleSearchChange}
            />

            <button onClick={handleDisableFilter}>Disable filter</button>
        </div>
    );
}

export default ReviewFilter;
