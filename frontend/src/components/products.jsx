import { useState } from "react"
import Card from "./card";

function ProdcutPage() {

    const [price, setPrice] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortType, setSortType] = useState('');

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        console.log(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        console.log(event.target.value);
    };

    const handleSortTypeChange = (event) => {
        setSortType(event.target.value);
        console.log(event.target.value);
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
                                    <div className="card card-body">
                                        <select value={filterType} onChange={handleFilterChange} style={{ width: "90%" }}>
                                            <option value="" disabled hidden>Filter By Category</option>
                                            <option value="Smart Phones">Smart Phones</option>
                                            <option value="Laptops">Laptops</option>
                                            <option value="Smart TVs">Smart TVs</option>
                                        </select>
                                        <br />
                                        <br />
                                        Select price filter:
                                        <br />
                                        <input type="radio" name="price_filter" className="filter-radio-btns" value="under" />Under&emsp;
                                        <input type="radio" name="price_filter" className="filter-radio-btns" value="above" />Above
                                        <br />
                                        <br />
                                        <input type="number" value={price} onChange={handlePriceChange} placeholder="Enter amount" style={{ width: "90%" }} />
                                        <br />
                                        <br />
                                        <button className="apply-btn">Apply</button>
                                        <br />
                                        <br />
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
                                    <div className="card card-body">
                                        <select defaultValue={sortType} onChange={handleSortTypeChange} style={{ width: "90%" }}>
                                            <option value="" disabled hidden>Sort By</option>
                                            <option value="Price">Price</option>
                                            <option value="Ratings">Ratings</option>
                                            <option value="Newest">Newest</option>
                                            <option value="Name">Name</option>
                                        </select>
                                        <br />
                                        <br />
                                        <input type="radio" name="sort_type" className="filter-radio-btns" value="asc" />Ascending&emsp;
                                        <input type="radio" name="sort_type" className="filter-radio-btnsr" value="des" />Descending
                                        <br />
                                        <br />
                                        <button className="apply-btn">Apply</button>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    )
}
export default ProdcutPage