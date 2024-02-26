const express = require("express");
const multer = require('multer');
const { 
    getReview,
    getGadgetReviews,
    createReview,
    updateReview,
    getReportedReviews,
    getVerifiedUsers,
    deleteReview
} = require("../controllers/reviewController")

const router = express.Router()

router.get("/getReview/:id",getReview)

router.get("/getGadgetReviews/:id",getGadgetReviews)

router.get("/getVerifiedUsers",getVerifiedUsers)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/",upload.single('image'),createReview)

router.put("/:id",updateReview)

router.get("/getReportedReviews",getReportedReviews)
router.delete("/deleteReview/:id",deleteReview)

module.exports = router