import { useParams } from "react-router-dom";
import ViewSmartPhone from "./viewgadgets/viewsmartphone";
import ViewEarBuds from "./viewgadgets/viewearbuds";
import ViewLaptop from "./viewgadgets/viewlaptop";
import ViewHeadPhone from "./viewgadgets/viewheadphone";
import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import Cookies from "js-cookie";
import "./css/reviews.css"
import "./css/viewproduct.css"
import Review from "./reviews";
import ReviewFilter from "./reviewFilter";

function ViewProduct() {
    const { productType, gadget_id } = useParams();
    const [ratingValue, setRatingValue] = useState(0);
    const [reviews, setReviews] = useState([])
    const [displayedReviews, setDisplayedReviews] = useState([])
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
            const response = await fetch("http://localhost:4000/api/reviews/" + gadget_id)
            const reviews = await response.json()
            setReviews(reviews)
            setDisplayedReviews(reviews)
        }
        fetchGadget();
        fetchReviews();
    }, [])

    function handleSearchChange(text){
        setDisplayedReviews(reviews.filter(review => review.review_header.toLowerCase().startsWith(text)))
    }

    function handleFilterChange(filter){
        if(filter=="negative"){
            console.log(reviews)
            const filteredArray = reviews.filter(review => review.rating < 3);
            setDisplayedReviews(filteredArray)
        }
        else if(filter=="positive"){
            const filteredArray = reviews.filter(review => review.rating > 2);
            setDisplayedReviews(filteredArray)
        }
        else if(filter=="all"){
            setDisplayedReviews(reviews)
        }
    }

    function handleDisableClick(){
        setDisplayedReviews(reviews)
    }

    function handleStarClick(selectedRating) {
        setRatingValue(selectedRating === ratingValue ? 0 : selectedRating);
    };

    function addReview(e) {
        if (Cookies.get("profile_name") === undefined) {
            e.preventDefault();
            alert("Login First!")
            location.href = "/login"
        }
        else {
            const rating = ratingValue;
            if(rating==0){
                alert("Select rating!")
                return
            }
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
        }
    }

    return (
        <div className="view_product">
            <table className="product_details">
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
                        <a href={gadget.buy_links?.Amazon}><img style={{padding: "8px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" className="buy_link_img" /></a>
                    }

                    {gadget.buy_links?.Flipkart &&
                        <a href={gadget.buy_links?.Flipkart}><img src="https://www.freepnglogos.com/uploads/flipkart-logo-png/flipkart-logo-transparent-png-download-0.png" className="buy_link_img" /></a>
                    }

                    {gadget.buy_links?.Reliance_Digital &&
                        <a href={gadget.buy_links?.Reliance_Digital}><img src="https://yt3.googleusercontent.com/ytc/AIf8zZQK9sUUsRXwfRy0Y3sNcIf9rOaSliYEW-v-K1QRHTc=s900-c-k-c0x00ffffff-no-rj" className="buy_link_img" /></a>
                    }
                    {gadget.buy_links?.Vijay_Sales &&
                        <a href={gadget.buy_links?.Vijay_Sales}><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Vijay_Sales.png" className="buy_link_img" /></a>
                    }
                </div>
            }
            <div className="reviews-container">
                {
                    displayedReviews.length !== 0 ? <><h1>Product Reviews</h1><div className="reviews-section">
                    <Review reviews={displayedReviews}/>
                    <ReviewFilter 
                    handleFilterChangeMain = {handleFilterChange}
                    handleDisableClick = {handleDisableClick}
                    handleSearchChangeMain = {handleSearchChange}
                    />
                </div></> : <h1>No reviews currently</h1>
                }

                
                <form className="add-review" onSubmit={addReview}>
                    <h1>Add a Review</h1>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={star <= ratingValue ? 'star checked' : 'star'}
                                onClick={() => handleStarClick(star)}
                            />
                        ))}
                    </div>
                    <br />
                    <input type="text"
                        id="new-review-header"
                        placeholder="Review Header"
                        className="review-header-input"
                        value={review_header}
                        onChange={(e) => { setReviewHeader(e.target.value) }}
                        required />
                    <textarea
                        id="new-review-text"
                        rows="4"
                        placeholder="Write your review here..."
                        value={review_msg}
                        onChange={(e) => { setReviewText(e.target.value) }}
                        required />
                    <button id="submit-review">Submit Review</button>
                </form>
            </div>
        </div>
    )
}

export default ViewProduct;
