import "../css/addGadget.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateGadget = () => {

    const [formData, setFormData] = useState({
        gadgetType: "",
        gadgetName: "",
        gadgetBrand: "",
        gadgetImage: "",
        gadgetPrice: 0,
        rating: 0,
        gadgetSpecs: [{ spec: "", value: "" }],
        buy_links: [{ name: "", value: "" }],
    });

    const { gadget_id } = useParams();
    useEffect(() => {
        const fetchGadget = async () => {
            const response = await fetch("http://localhost:4000/api/products/" + gadget_id)
            const gadgetDetails = await response.json()
            console.log(gadgetDetails)
            let fieldsToDelete = ['createdAt', 'updatedAt','__v'];
            fieldsToDelete.forEach(field => {
                delete gadgetDetails[field];
              });
            gadgetDetails.gadgetSpecs = Object.entries(gadgetDetails.gadgetSpecs).map(([spec, value]) => ({ spec, value }));
            gadgetDetails.buy_links = Object.entries(gadgetDetails.buy_links).map(([name, value]) => ({ name, value }));
            setFormData(gadgetDetails)
        }
        fetchGadget();
    }, [])

    const handleInputChange = (e, index, field, subField) => {
        const newFormData = { ...formData };
    
        if (field === "gadgetSpecs" || field === "buy_links") {
            newFormData[field][index][subField] = e.target.value;
        } else if (field === "gadgetPrice") {
            // Convert the input value to a number using parseFloat or parseInt
            newFormData[field] = parseFloat(e.target.value);
        } else {
            newFormData[field] = e.target.value;
        }
        setFormData(newFormData);
    };
    

    const handleAddField = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], { value: "" }],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const l_gadgetSpecs = {};
        const l_buy_links = {};
        // Add your logic for handling form submission
        formData.gadgetSpecs.map(gadgetSpec => (
            l_gadgetSpecs[gadgetSpec.spec] = gadgetSpec.value
        ))
        formData.buy_links.map(buy_link => (
            l_buy_links[buy_link.name] = buy_link.value
        ))
        formData.gadgetSpecs = l_gadgetSpecs
        formData.buy_links = l_buy_links
        console.log(formData)
        const response = axios.put("http://localhost:4000/api/products/"+gadget_id, formData).
        then(response => {
            if (response.status >= 200 && response.status < 300) {
                alert("Gadget Updated!");
                location.href="/viewgadget";
              // Further processing of the response
            } else {
              console.log('Request failed with status:', response.status);
              // Handle the error condition
            }
          })
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form>
                <label>Type:</label>
                <input
                    type="text"
                    value={formData.gadgetType}
                    onChange={(e) => handleInputChange(e, null, "gadgetType")}
                    required
                />

                <label>Name:</label>
                <input
                    type="text"
                    value={formData.gadgetName}
                    onChange={(e) => handleInputChange(e, null, "gadgetName")}
                    required
                />

                <label>Brand:</label>
                <input
                    type="text"
                    value={formData.gadgetBrand}
                    onChange={(e) => handleInputChange(e, null, "gadgetBrand")}
                    required
                />

                <label>Image URL:</label>
                <input
                    type="text"
                    value={formData.gadgetImage}
                    onChange={(e) => handleInputChange(e, null, "gadgetImage")}
                    required
                />

                <label>Price:</label>
                <input
                    type="number"
                    value={formData.gadgetPrice}
                    onChange={(e) => handleInputChange(e, null, "gadgetPrice")}
                    required
                />

                <label>Specifications:</label>
                {formData.gadgetSpecs.map((specification, index) => (
                    <div className="input-group" key={index}>
                        <input
                            type="text"
                            value={specification.spec}
                            onChange={(e) =>
                                handleInputChange(e, index, "gadgetSpecs", "spec")
                            }
                            placeholder={`Specification ${index + 1}`}
                        />
                        <input
                            type="text"
                            value={specification.value}
                            onChange={(e) =>
                                handleInputChange(e, index, "gadgetSpecs", "value")
                            }
                            placeholder=""
                            style={{ width: "100%" }}
                        />
                    </div>
                ))}

                <button
                    className="button"
                    type="button"
                    onClick={() => handleAddField("gadgetSpecs")}
                >
                    + Add Specification
                </button>

                <label>Buy Links:</label>
                {formData.buy_links.map((link, index) => (
                    <div className="input-group" key={index}>
                        <input
                            type="text"
                            value={link.name}
                            onChange={(e) => handleInputChange(e, index, "buy_links", "name")}
                            placeholder={`Name`}
                        />
                        <input
                            type="text"
                            value={link.value}
                            onChange={(e) => handleInputChange(e, index, "buy_links", "value")}
                            placeholder="Link"
                            style={{ width: "100%" }}
                        />
                    </div>
                ))}
                <button className="button" type="button" onClick={() => handleAddField("buy_links")}>
                    + Add Buy Link
                </button>

                <button onClick={handleSubmit} className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UpdateGadget;