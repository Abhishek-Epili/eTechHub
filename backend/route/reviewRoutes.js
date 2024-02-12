const express = require("express");
const { 
    getReviews,
    createReview,
    updateReview
} = require("../controllers/reviewController")

const router = express.Router()

router.get("/:id",getReviews)

router.post("/",createReview)

router.put("/:id",updateReview)

module.exports = router