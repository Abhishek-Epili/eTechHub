import React, { useState, useEffect, useRef } from "react";

function Navbar() {

  const suggestions = ["Asus TUF 15", "One Plus Nord CE 2", "HP Laptop 15", "Redmi Note 5", "Cosmic G4450", "Samsung Galaxy Note 7", "Iphone 14 Pro Max"];
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputText, setInputText] = useState("");
  const autocompleteRef = useRef();

  const handleInputChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    setInputText(inputText);

    // Filter suggestions based on user input
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(inputText));
    filteredSuggestions.length == 0 ? setFilteredSuggestions(["No results found"]) : setFilteredSuggestions(filteredSuggestions);
   
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setFilteredSuggestions([]);
  };

  const handleDocumentClick = (event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
      setFilteredSuggestions([]);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      setFilteredSuggestions([]);
    }
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
            <input type="text" placeholder="&#xF002; Search" className="search_bar" value={inputText} onChange={handleInputChange} />
            {filteredSuggestions.length > 0 && (
              <div className="autocomplete-items">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        
      </form>
      <a href="">Login</a>
    </nav >
      
    </>
  )
}

export default Navbar