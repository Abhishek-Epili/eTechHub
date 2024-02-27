import { useState, useEffect } from "react";
import axios from "axios";

function ViewDetectedReviews() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        function fetchReviews() {
            axios.get("http://localhost:4000/api/reviews/getFakeReviews").
            then(response=>{
                setReviews(response.data)
                console.log(response.data)
            }).
            catch(err=>{
                console.log(err)
            })
        }
        fetchReviews()
    }, [reviews])

    return (
        <>
            <div>
                <h1>Verified Detected Reviews</h1>
                {reviews.map(review => (
                    <div className='ver_comp' key={review._id}>
                        <p>Review for: {review.gadget_name}</p>
                        <p>Review Header: {review.review_header}</p>
                        <p>Review by: {review.review_by?.name}</p>
                        <a href={`/getReview/${review._id}/viewreview`} >Inspect</a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ViewDetectedReviews;