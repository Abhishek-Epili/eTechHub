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
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [verifiedUserValue, setVerifiedUserValue] = useState("false");
    const [file, setFile] = useState(null);
    const [legit, setLegit] = useState("yes");

    useEffect(() => {
        const fetchGadget = async () => {
            const response = await fetch("http://localhost:4000/api/products/" + gadget_id)
            const gadgetDetails = await response.json()
            setGadget(gadgetDetails)
        }
        const fetchReviews = async () => {
            const response = await fetch("http://localhost:4000/api/reviews/getGadgetReviews/" + gadget_id)
            const reviews = await response.json()
            setReviews(reviews)
            setDisplayedReviews(reviews)
        }
        fetchGadget();
        fetchReviews();
    }, [])

    function setVerifiedValue(){
        if(!verifiedUser){
            setVerifiedUserValue("pending")
            console.log("Changed to pending")
        }
        else{
            setVerifiedUserValue("false")
            console.log("Changed to false")
        }
    }

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
        e.preventDefault();
        // Check if the user is logged in
        if (Cookies.get("profile_name") === undefined) {
            alert("Login First!");
            window.location.href = "/login";
            return; // Terminate the function
        }
    
        // Check if rating is selected
        if (ratingValue === 0) {
            alert("Select rating!");
            return; // Terminate the function
        }
    
        // Construct the review_by object
        const review_by = {
            name: Cookies.get("profile_name"),
            username: Cookies.get("profile_username")
        };
    
        // Create form data to handle file upload
        let verified = 0;
        if(verifiedUserValue=="pending"){
            verified = 1;
        }
        else{
            verified = 0;
        }
        axios.post("http://127.0.0.1:5000/predict",{
            "RATING": [ratingValue],
            "VERIFIED_PURCHASE":verified,
            "REVIEW_TITLE": review_header,
            "REVIEW_TEXT": review_msg
        }).then(response=>{
            console.log(response.data)
            setLegit(response.data.Output)
        })
        const formData = new FormData();
        formData.append("gadget_id", gadget_id);
        formData.append("gadget_name", gadget.gadgetName);
        formData.append("rating", ratingValue);
        formData.append("review_header", review_header);
        formData.append("review_msg", review_msg);
        formData.append("review_by[name]", review_by.name); 
        formData.append("review_by[username]", review_by.username); 
        formData.append("legit",legit);
        formData.append("verifiedUser", verifiedUserValue); // Add verifiedUser
        formData.append("image", file); // Add file
        formData.forEach(function(value, key){
            console.log(key + ': ' + value);
        });

        axios.post("http://localhost:4000/api/reviews", formData, {
            headers: {
                "Content-Type": "multipart/form-data" // Specify content type for file upload
            }
        })
        .then(response => {
            // Handle successful response
            console.log("Review added successfully:", response.data);
            // Optionally, you can clear the form fields or perform any other actions after adding the review
        })
        .catch(error => {
            // Handle error
            console.error("Error adding review:", error);
            alert("Failed to add review. Please try again later.");
        });
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
                    <div>
                        <input type="checkbox" id="verified-user" checked={verifiedUser} onChange={() => {setVerifiedUser(!verifiedUser); setVerifiedValue();}} />
                        <label htmlFor="verified-user">Verified User? Check this box and upload product image!!</label>
                    </div>
                    <div>
                        <input type="file" id="file-upload" onChange={(e) => setFile(e.target.files[0])} disabled={!verifiedUser} />
                    </div>
                    <button id="submit-review">Submit Review</button>
                </form>
            </div>
        </div>
    )
}

export default ViewProduct;
