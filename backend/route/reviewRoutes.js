const express = require("express");
const { 
    getReview,
    createReview,
    updateReview,
    getReportedReviews
} = require("../controllers/reviewController")

const router = express.Router()

router.get("/getReview/:id",getReview)

router.post("/",createReview)

router.put("/:id",updateReview)

router.get("/getReportedReviews",getReportedReviews)

module.exports = router