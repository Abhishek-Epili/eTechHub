import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/verifiedPurchases.css'

function ViewVerifiedReq() {
    const { id, viewreview } = useParams();
    const [reviews, setReviews] = useState([]);

    // Function to convert ArrayBuffer to Base64
    function arrayBufferToBase64(buffer) {
        const binary = new Uint8Array(buffer);
        const base64String = btoa(
            binary.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return base64String;
    }

    async function handleSubmit(value, id) {
        const report = { "verified_user": value }
        console.log(report, id)
        axios.put("http://localhost:4000/api/reviews/" + id, { report }).
            then(response => {
                alert("Done")
                location.href = "/verifiedpurchase";
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reviews/getReview/' + id);
                console.log(response.data);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, [id]); // Include id as a dependency to re-fetch data when id changes

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
                    {review.file ? (
                        <img
                            src={(() => {
                                if (review.file.data && review.file.contentType) {
                                    const base64Data = arrayBufferToBase64(review.file.data.data);
                                    return `data:${review.file.contentType};base64,${base64Data}`;
                                } else {
                                    console.error("Image data or content type is missing:", review.file);
                                    return ''; // Return empty string to prevent broken image icon
                                }
                            })()}
                            className="img"
                            alt="Review Image"
                            onError={(e) => {
                                console.error('Error rendering image:', e);
                                e.target.style.display = 'none'; // Hide the image if there's an error
                            }}
                        />
                    ) : (
                        <p>No image uploaded</p>
                    )}
                    <br />
                    {viewreview == "editreview" &&
                        (<>
                            <button onClick={() => { handleSubmit("true", review._id) }}>Accept</button>
                            <button onClick={() => { handleSubmit("false", review._id) }}>Reject</button>
                        </>
                        )
                    }
                </div>
            ))}
        </div>
    );
}

export default ViewVerifiedReq;
