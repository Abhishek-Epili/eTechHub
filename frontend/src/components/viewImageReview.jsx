import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewImageReview(){

    const { id } = useParams();
    const [reviews, setReview] = useState([]);

    useEffect(()=>{
        function fetchReview(){
            axios.get("http://localhost:4000/api/reviews/getReview/"+id).
            then(response=>{
                console.log(response.data)
                setReview(response.data)
            }).
            catch(err=>{
                console.log(err)
            });
        }
        fetchReview();
    },[])

    function arrayBufferToBase64(buffer) {
        const binary = new Uint8Array(buffer);
        const base64String = btoa(
            binary.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return base64String;
    }


    return(
        <>
            {reviews && reviews.map(review=>(
                <center key={review._id}>
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
                </center>
            ))}
        </>
    )
}

export default ViewImageReview;