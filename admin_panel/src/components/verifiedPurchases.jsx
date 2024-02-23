import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/verifiedPurchases.css'

function VerifiedPurchase() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reviews/getVerifiedUsers');
                console.log(response.data)
                setReviews(response.data); // Assuming the response.data is an array of reviews
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1>Verified Purchase Requests</h1>
            {reviews.map(review => (
                <div className='ver_comp' key={review._id}>
                    <p>Review for: {review.gadget_name}</p>
                    <p>Review Header: {review.review_header}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Review by: {review.review_by.name}</p>
                    <p>Review Text: {review.review_msg}</p>
                    <p>Image uploaded:</p>
                    {review.file && ( // Check if image data is available
                        <img
                        src={`data:${review.file.contentType};base64,${btoa(
                            String.fromCharCode.apply(null, review.file.data.data)
                        )}`}/>
                    )}
                    <br/>
                    <button>Accept</button>
                    <button>Reject</button>
                </div>
            ))}
        </div>
    );
}

export default VerifiedPurchase;
