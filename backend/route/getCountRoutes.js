const express = require("express");
const { 
    getUserCount,
    getReviewCount,
    getProductCount
} = require("../controllers/getCountController")

const router = express.Router()

router.get("/getUserCount",getUserCount)
router.get("/getReviewCount",getReviewCount)
router.get("/getProductCount",getProductCount)

module.exports = router