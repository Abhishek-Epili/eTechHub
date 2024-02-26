const Review = require("../models/reviewSchema");

const getGadgetReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const query = {
            "gadget_id": id
        };
        const reviews = await Review.find(query, {}).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReview = async (req, res) => {
    const { id } = req.params;
    try {
        const query = {
            "_id": id
        };
        const reviews = await Review.find(query, {}).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getVerifiedUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const query = {
            "verified_user": "pending"
        };
        const reviews = await Review.find(query, {}).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createReview = async (req, res) => {
    const { gadget_id, gadget_name, rating, review_header,review_by, legit, review_msg, verifiedUser } = req.body;
    let review = {}
    const file = req.file; // Access the uploaded file from req.file
    if (file !== undefined) {
        review = {
            gadget_id: gadget_id,
            gadget_name: gadget_name,
            rating: rating,
            review_header: review_header,
            review_msg: review_msg,
            review_by: review_by,
            legit: legit,
            verified_user: verifiedUser,
            file: {
                data: file.buffer, // Store file data as Buffer
                contentType: file.mimetype // Store file content type
            }
        }
    }
    else {
        review = {
            gadget_id: gadget_id,
            gadget_name: gadget_name,
            rating: rating,
            review_header: review_header,
            review_msg: review_msg,
            review_by: review_by,
            legit: legit,
            verified_user: verifiedUser,
            file: null
        }
    }
    console.log(review)
    try {
        // Assuming Review is your Mongoose model
        const response = await Review.create(review);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
};

const deleteReview = async(req,res)=>{
    const{id} = req.params;
    try{
        const deletedReview = await Review.findByIdAndDelete(id,{new: true});
        res.status(200).json(deletedReview)
    }
    catch(err){
        res.status(400).json({error: err})
    }
}

const updateReview = async (req, res) => {
    const { id } = req.params;
    const { report } = req.body;
    console.log(report)
    try {
        const updatedReview = await Review.findByIdAndUpdate(id,  report , { new: true });
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getReportedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ 'report.reported': 'yes' });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getReview,
    getGadgetReviews,
    createReview,
    updateReview,
    getReportedReviews,
    getVerifiedUsers,
    deleteReview
};
