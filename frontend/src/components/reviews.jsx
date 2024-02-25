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

    const handleReport = async (event, reviewId, reportTxt) => {
        event.preventDefault(); // Prevent the default behavior of the button
        
        if (Cookies.get("profile_name") == undefined) {
            alert("Login First!");
            location.href = "/login";
        } else {
            try {
                
                const report = {
                    report_txt: reportTxt,
                    reported: 'yes',
                    reported_by: Cookies.get("profile_name")
                }
                console.log(report);
                const response = await axios.put("http://localhost:4000/api/reviews/" + reviewId, {report});
                
                if (response.status >= 200 && response.status < 300) {
                    alert("Thank you for reporting the review!!");
                    console.log(response.data)
                } else {
                    console.log('Request failed with status:', response.status);
                    // Handle the error condition
                }
                
                // Reset report reason and close modal
                setReportReason('');
                toggleModal();
            } catch (error) {
                console.error('Error reporting review:', error);
                // Handle error, show error message, etc.
            }
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
                    <div className="review-author"> {review.review_by.name}</div>
                    {review.verified_user == "true" && (<div style={{float: "right", marginRight: '10px'}}>VERIFIED USER!</div>)}
                    <div className="review-header">About: {review.review_header}</div>
                    {review.file && review.verified_user == "true" && (<a style={{marginRight: "10px", float: "right"}} href={`/viewreviewimage/${review._id}`}>View Image</a>)}
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
                                <button onClick={(event) => handleReport(event,review._id, reportReason)}>Report</button>
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
