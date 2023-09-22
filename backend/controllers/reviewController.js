const Review = require("../models/reviewSchema")

const getReviews = async(req,res) =>{
    const { id } = req.params
    try{
        const query = {
            "gadget_id": id
        }
    const reviews = await Review.find(query,{}).sort({createdAt: -1})
    res.status(200).json(reviews)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const createReview = async(req,res)=>{
    const { gadget_id,rating,review_header,review_msg,review_by } = req.body
    try{
        const review = await Review.create({ gadget_id,rating,review_header,review_msg,review_by })
        res.status(200).json(review)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getReviews,
    createReview
}