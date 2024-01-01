import { FaStar } from 'react-icons/fa';

function Review({reviews}){
    return (
        <div className="reviews">
                        {
                            reviews && reviews.map(review => (
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
                                    <p className="review-author"> {review.review_by.name}</p>
                                    <p className="review-header">About: {review.review_header}</p>
                                    <p className="review-text">Review: {review.review_msg}</p>
                                </div>
                            ))
                        }
                    </div>
    )
}

export default Review