import { useParams } from "react-router-dom";
import ViewSmartPhone from "./viewgadgets/viewsmartphone";
import ViewEarBuds from "./viewgadgets/viewearbuds";
import ViewLaptop from "./viewgadgets/viewlaptop";
import ViewHeadPhone from "./viewgadgets/viewheadphone";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./css/reviews.css"

function ViewProduct() {
    const { productType, gadget_id } = useParams();

    const [reviews, setReviews] = useState([])
    const [review_header, setReviewHeader] = useState('');
    const [review_msg, setReviewText] = useState('');
    const [gadget, setGadget] = useState({});

    useEffect(() => {
        const fetchGadget = async () => {
            const response = await fetch("http://localhost:4000/api/products/" + gadget_id)
            const gadgetDetails = await response.json()
            setGadget(gadgetDetails)
        }
        const fetchReviews = async () => {
            const response = await fetch("http://localhost:4000/api/reviews/"+gadget_id)
            const reviews = await response.json()
            setReviews(reviews)
        }
        fetchReviews();
        fetchGadget();
    }, [])

    function addReview() {
        if (Cookies.get("profile_name") === undefined) {
            alert("Login First!")
            location.href = "/login"
        }
        else {
            const rating = 5
            const review_by = {
                "name": Cookies.get("profile_name"),
                "username": Cookies.get("profile_username")
            }
            const review = axios.post("http://localhost:4000/api/reviews", {
                gadget_id,
                rating,
                review_header,
                review_msg,
                review_by
            })
            location.reload();
        }
    }

    return (
        <div className="view_product">
            <table>
                <tbody>
                    <tr>
                        <td> <center> <img className="gadget_image" src={gadget.gadgetImage} /></center></td>
                        <td className="gadget_details">
                            <center>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="specs_head" style={{ textAlign: "center" }} colSpan={2}>Specs</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {productType === "Smartphone" ? <ViewSmartPhone gadget={gadget} /> : productType === "Laptop" ? <ViewLaptop gadget={gadget} /> : productType === "Headphone" ? <ViewHeadPhone gadget={gadget} /> : productType === "Earbud" ? <ViewEarBuds gadget={gadget} /> : console.log("Not found")}

                                    </tbody>
                                </table>
                            </center>
                        </td>
                    </tr>
                </tbody>
            </table>
            {gadget &&
                <div className="buy_links">Buy from here:

                    {gadget.buy_links?.Amazon &&
                        <a href={gadget.buy_links?.Amazon}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" className="buy_link_img" /></a>
                    }

                    {gadget.buy_links?.Flipkart &&
                        <a href={gadget.buy_links?.Flipkart}><img src="https://www.freepnglogos.com/uploads/flipkart-logo-png/flipkart-logo-transparent-png-download-0.png" className="buy_link_img" /></a>
                    }

                    {gadget.buy_links?.Reliance_Digital &&
                        <a href={gadget.buy_links?.Reliance_Digital}><img src="data:image/png;base64,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" className="buy_link_img" /></a>
                    }
                    {gadget.buy_links?.Vijay_Sales &&
                        <a href={gadget.buy_links?.Vijay_Sales}><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Vijay_Sales.png" className="buy_link_img" /></a>
                    }
                </div>
            }
            <div className="reviews-container">
                <h1>Product Reviews</h1>
                <div className="reviews">
                    {
                        reviews && reviews.map(review => (
                            <div key={review._id} className="review">
                                <p className="review-author"> {review.review_by.name}</p>
                                <p className="review-header">About: {review.review_header}</p>
                                <p className="review-text">Review: {review.review_msg}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="add-review">
                    <h1>Add a Review</h1>
                    <input type="text"
                        id="new-review-header"
                        placeholder="Review Header"
                        className="review-header-input"
                        value={review_header}
                        onChange={(e) => { setReviewHeader(e.target.value) }} />
                    <textarea
                        id="new-review-text"
                        rows="4"
                        placeholder="Write your review here..."
                        value={review_msg}
                        onChange={(e) => { setReviewText(e.target.value) }}></textarea>
                    <button onClick={addReview} id="submit-review">Submit Review</button>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
