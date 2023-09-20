const express = require("express");

const { createUser, 
        checkUser } = require("../controllers/userDetailsController");

const router = express.Router()

router.post('/addUser',createUser)

router.post('/checkUser',checkUser)
module.exports = router