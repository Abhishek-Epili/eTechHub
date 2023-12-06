import React, { useState, useEffect } from "react";
import Card from "./card";
import "./css/products.css"

function ProductPage() {
    // State variables
    const [price, setPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortType, setSortType] = useState('');
    const [gadgets, setGadgets] = useState([]);
    const [displayedGadgets, setDisplayedGadgets] = useState([]);
    const [gadgetTypes, setGadgetTypes] = useState([]);
    const [priceOrder, setPriceOrder] = useState('');

    // Fetch gadgets on component mount
    useEffect(() => {
        const fetchGadgets = async () => {
            const response = await fetch("http://localhost:4000/api/products");
            const json = await response.json();
            if (response.ok) {
                setGadgets(json);
                setDisplayedGadgets(json);
            }
        };
        fetchGadgets();
    }, []);

    // Update gadget types when gadgets change
    useEffect(() => {
        if (gadgets.length > 0) {
            const tempNames = gadgets.map(gadget => gadget.gadgetType);
            const uniqueArray = [...new Set(tempNames)];
            setGadgetTypes(uniqueArray);
        }
    }, [gadgets]);

    // Update displayed gadgets based on filter, price, and price order
    const updateDisplayedGadgets = (filterType, priceOrder, price, sortType, sortOrder) => {

        let filteredGadgets = [...gadgets];
        if (filterType !== '') {
            if (filterType !== 'all') {
                filteredGadgets = filteredGadgets.filter((gadget) => gadget.gadgetType === filterType);
            }
        }
        if (price !== '') {
            const priceValue = Number(price);
            if (priceOrder === "under") {
                filteredGadgets = filteredGadgets.filter((gadget) => gadget.gadgetPrice < priceValue);
            } else if (priceOrder === "above") {
                filteredGadgets = filteredGadgets.filter((gadget) => gadget.gadgetPrice > priceValue);
            }
        }
        
        let order = sortOrder === 'asc' ? 1 : sortOrder === 'des' ? -1 : 0;

        // Perform the sorting operation using a comparison function
        filteredGadgets = [...filteredGadgets].sort((a, b) => {
            if (sortType === 'Price') {
                return (a.gadgetPrice - b.gadgetPrice) * order;
            } else if (sortType === 'Ratings') {
                return (a.rating - b.rating) * order;
            } else if (sortType === 'Newest') {
                // Assuming the gadgets have a unique ID and a property named 'date' to represent the creation date.
                return (new Date(a.createdAt) - new Date(b.createdAt)) * order;
            } else if (sortType === 'Name') {
                return a.gadgetName.localeCompare(b.gadgetName) * order;
            }
        });
        setDisplayedGadgets(filteredGadgets);
    };

    // Update displayed gadgets when filterType changes
    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        updateDisplayedGadgets(e.target.value, priceOrder, price, sortType, sortOrder);
    };

    // Update displayed gadgets when price order changes
    const handlePriceOrderChange = (e) => {
        setPriceOrder(e.target.value);
        updateDisplayedGadgets(filterType, e.target.value, price, sortType, sortOrder);
    };

    // Update displayed gadgets when price changes
    const handlePriceChange = (e) => {
        if (priceOrder === '') {
            alert("Please select price filter");
            return;
        }
        setPrice(e.target.value);
        updateDisplayedGadgets(filterType, priceOrder, e.target.value, sortType, sortOrder);
    };

    // Update displayed gadgets when sortType or sortOrder changes


    // Update sortType when sort dropdown changes
    const handleSortTypeChange = (e) => {
        if (sortOrder === '') {
            alert("Select Sorting Order");
            return;
        }
        setSortType(e.target.value);
        updateDisplayedGadgets(filterType, priceOrder, price, e.target.value, sortOrder);
    };

    // Update sortOrder when sort order radio buttons change
    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        updateDisplayedGadgets(filterType, priceOrder, price, sortType, e.target.value);

    }

    // Reset filters and sort
    const handleDisableClick = () => {
        setDisplayedGadgets(gadgets);
        setFilterType('');
        setSortOrder('');
        setSortType('');
        setPriceOrder('');
        setPrice('');
    }

    return (
        <>
            <br />
            <h2>Products</h2>
            <div className="productpage">
                <div className="filters-and-sort">
                    <div className="filters-container">
                        <p>
                            <a className="btn btn-primary filter-btn" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Filter Products <i className="fa fa-caret-down" style={{ float: "right" }}></i></a>
                        </p>
                        <div className="row">
                            <div className="col">
                                <div className="collapse multi-collapse" id="multiCollapseExample1">
                                    <div className="card card-body filter-sort-body">
                                        <select value={filterType} onChange={handleFilterChange} style={{ width: "90%" }}>
                                            <option value="all" >All</option>
                                            {gadgetTypes && gadgetTypes.map(gadgetType => (
                                                <option key={gadgetType} value={gadgetType}>{gadgetType}</option>
                                            ))}
                                        </select>
                                        Select price filter:
                                        <br />
                                        <input type="radio" name="price_filter" checked={priceOrder === 'under'} className="filter-radio-btns" value="under" onChange={handlePriceOrderChange} />Under&emsp;
                                        <input type="radio" name="price_filter" checked={priceOrder === 'above'} className="filter-radio-btns" value="above" onChange={handlePriceOrderChange} />Above
                                        <input type="number" value={price} onChange={handlePriceChange} placeholder="Enter amount" style={{ width: "90%" }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="sort-container">
                        <p>
                            <button className="btn btn-primary sort-btn" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Sort Products <i className="fa fa-caret-down" style={{ float: "right" }}></i></button>
                        </p>
                        <div className="row">
                            <div className="col">
                                <div className="collapse multi-collapse" id="multiCollapseExample2">
                                    <div className="card card-body filter-sort-body">
                                        <select value={sortType} onChange={handleSortTypeChange} style={{ width: "90%" }}>
                                            <option value="" disabled hidden>Sort By</option>
                                            <option value="Price">Price</option>
                                            <option value="Ratings">Ratings</option>
                                            <option value="Newest">Newest</option>
                                            <option value="Name">Name</option>
                                        </select>
                                        <br />
                                        <input type="radio" name="sort_type" onChange={handleSortOrderChange} className="filter-radio-btns" value="asc" checked={sortOrder === "asc"} />Ascending&emsp;
                                        <input type="radio" name="sort_type" onChange={handleSortOrderChange} className="filter-radio-btnsr" value="des" checked={sortOrder === "des"} />Descending
                                    </div>
                                </div>
                                <br />
                                <button className="cancel-btn" onClick={handleDisableClick}>Disable all filters and sortings applied</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products">
                    {displayedGadgets && displayedGadgets.map(gadget => (
                        <button key={gadget._id} onClick={() => {
                            location.href = "/viewproduct/" + gadget.gadgetType+"/"+gadget._id;
                        }}>
                            <Card
                                img_url={gadget.gadgetImage}
                                name={gadget.gadgetName}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductPage;
