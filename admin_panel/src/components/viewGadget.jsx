import React, { useState, useEffect } from "react";
import Card from "./card";
import "../css/products.css"

function ViewGadget() {
    // State variables
    const [gadgets, setGadgets] = useState([]);

    // Fetch gadgets on component mount
    useEffect(() => {
        const fetchGadgets = async () => {
            console.log("OK")
            const response = await fetch("http://localhost:4000/api/products");
            const json = await response.json();
            if (response.ok) {
                setGadgets(json);
            }
        };
        fetchGadgets();
    }, []);

    function updateGadget(id) {
        location.href = "/updategadget/" + id;
    }

    return (
        <>
            <br />
            <h2>Products</h2>
            <div className="productpage">
                <div className="products">
                    {gadgets && gadgets.map(gadget => (
                        <Card
                            key={gadget._id} // Add key prop here using a unique identifier from the gadget object
                            img_url={gadget.gadgetImage}
                            name={gadget.gadgetName}
                            updateGadget={updateGadget}
                            gadget_id={gadget._id}
                        />
                    ))}
                </div>
            </div>

        </>
    );
}

export default ViewGadget;
