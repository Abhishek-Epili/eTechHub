import React, { useState, useEffect, useRef } from "react";

function Navbar() {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [inputText, setInputText] = useState("");
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
    if (inputText.length == 0) {
      setInputText('')
      setFilteredSuggestions([])
      return
    }
    setInputText(inputText);

    // Filter suggestions based on user input
    const filteredSuggestions = gadgets.filter(gadget => gadget.gadgetName.toLowerCase().startsWith(inputText));
    filteredSuggestions.length == 0 ? setFilteredSuggestions([]) : setFilteredSuggestions(filteredSuggestions);
    console.log(filteredSuggestions)
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setFilteredSuggestions([]);
    location.href = "/viewproduct/" + suggestion._id;
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
            <div className="autocomplete-items">
              {filteredSuggestions.length > 0 && (

                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.gadgetName}
                  </div>
                ))
              ) 
              }
            </div>
          </div>
        </form>
        <a href="">Login</a>
      </nav >

    </>
  )
}

export default Navbar