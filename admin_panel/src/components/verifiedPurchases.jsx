import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/verifiedPurchases.css'

function VerifiedPurchase() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reviews/getVerifiedUsers');
                console.log(response.data);
                setReviews(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Verified Purchase Requests</h1>
            {reviews.map(review => (
                <div className='ver_comp' key={review._id}>
                    <p>Review for: {review.gadget_name}</p>
                    <p>Review Header: {review.review_header}</p>
                    <p>Review by: {review.review_by?.name}</p>
                    <a href={`/getReview/${review._id}/editreview`} >Inspect</a>
                </div>
            ))}
        </div>
    );
}

export default VerifiedPurchase;
