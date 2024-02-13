const Review = require("../models/reviewSchema");

const getReview = async (req, res) => {
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

const createReview = async (req, res) => {
    const { gadget_id, rating, review_header, review_msg, review_by } = req.body;
    try {
        const review = await Review.create({ gadget_id, rating, review_header, review_msg, review_by  });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    const { id } = req.params;
    const { reported, report_txt } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { reported, report_txt }, // Update only specific fields
            { new: true }
        );
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
        const query = { reported: 'yes' }; // Query for reported reviews
        const reviews = await Review.find(query);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getReview,
    createReview,
    updateReview,
    getReportedReviews
};
