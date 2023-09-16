import React, { useState, useEffect, useRef } from "react";

function Navbar() {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const autocompleteRef = useRef();

  useEffect(() => {
    const fetchGadgets = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const json = await response.json();
      if (response.ok) {
        setGadgets(json);
      }
    };
    fetchGadgets();
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    setInputText(inputText);

    // Filter suggestions based on user input
    const filteredSuggestions = gadgets.filter(gadget =>
      gadget.gadgetName.toLowerCase().startsWith(inputText)
    );
    setFilteredSuggestions(filteredSuggestions);
    setSelectedSuggestionIndex(-1); // Reset selected index when input changes
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.gadgetName);
    setFilteredSuggestions([]);
    location.href = "/viewproduct/" + suggestion._id;
  };

  const handleDocumentClick = (event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyUp = (event) => {
    // Handle up key press to navigate through suggestions
    if (event.keyCode === 38) {
      event.preventDefault(); // Prevent cursor from moving in input field

      if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex((prevIndex) => prevIndex - 1);
      } else {
        // If the first suggestion is reached, set the selected index to the last suggestion
        setSelectedSuggestionIndex(filteredSuggestions.length - 1);
      }
    }
  };

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    // Handle down key press to navigate through suggestions
    if (event.keyCode === 40) {
      event.preventDefault(); // Prevent cursor from moving in input field
  
      if (selectedSuggestionIndex < filteredSuggestions.length - 1) {
        setSelectedSuggestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // If the last suggestion is reached, set the selected index to the first suggestion
        setSelectedSuggestionIndex(0);
      }
    }
  
    // Handle Enter key press
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent form submission
  
      if (selectedSuggestionIndex >= 0) {
        // If a suggestion is selected, simulate a click event on it
        handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex]);
      }
    }
  };
  

  const handleFocus = () => {
    // Reset selected index when the input field gains focus
    setSelectedSuggestionIndex(-1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <>
      <nav>
        <h2>eTech Hub</h2>
        <a href="/">Home</a>
        <a href="/product">Products</a>
        <form>
          <div ref={autocompleteRef}>
            <input
              type="text"
              placeholder="&#xF002; Search"
              className="search_bar"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onFocus={handleFocus}
            />
            <div className="autocomplete-items">
              {filteredSuggestions.length > 0 &&
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`autocomplete-item ${index === selectedSuggestionIndex ? "selected" : ""
                      }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.gadgetName}
                  </div>
                ))}
            </div>
          </div>
        </form>
        <a href="">Login</a>
      </nav>
    </>
  );
}

export default Navbar;
