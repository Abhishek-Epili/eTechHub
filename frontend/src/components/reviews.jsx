import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Cookies from "js-cookie";
import axios from 'axios';

function Review({ reviews }) {
    const [isOpen, setIsOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleReport = async (reviewId, reportTxt) => {
        try {
            const response = await axios.put("http://localhost:4000/api/reviews/"+reviewId, {
                report_txt: reportTxt,
                reported: 'yes' // Assuming you want to mark it as reported
            });
            
            console.log('Review reported successfully', response.data);
            // Reset report reason and close modal
            setReportReason('');
            toggleModal();
        } catch (error) {
            console.error('Error reporting review:', error);
            // Handle error, show error message, etc.
        }
    };
    

    return (
        <div className="reviews">
            {reviews && reviews.map(review => (
                <div key={review._id} className="review">
                    <div className="review-rating">
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={star <= review.rating ? 'star checked' : 'star'}
                                />
                            ))}
                        </div>
                    </div>
                    {review.review_by.username !== Cookies.get("profile_username") && (
                        <a href="#" className="report-link" onClick={() => toggleModal(review._id)}>Report</a>
                    )}
                    <p className="review-author"> {review.review_by.name}</p>
                    <p className="review-header">About: {review.review_header}</p>
                    <p className="review-text">Review: {review.review_msg}</p>
                    {isOpen && (
                        <div className="floating-window">
                            <div className="floating-content">
                                <h2>Report Review</h2>
                                <textarea
                                    placeholder="Why do you wanna report this review?"
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    required
                                ></textarea>
                                <button onClick={() => handleReport(review._id, reportReason)}>Report</button>
                                <button onClick={toggleModal}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Review;
