const Review = require("../models/reviewSchema")
const Gadget = require('../models/gadgetSchema')
const UserDetails = require("../models/userDetailsSchema")

const getUserCount = async(req,res) => {
    try{
        const count = await UserDetails.countDocuments({});
        res.status(200).json(count);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getReviewCount = async(req,res) => {
    try{
        const count = await Review.countDocuments({});
        res.status(200).json(count);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getProductCount = async(req,res) => {
    try{
        const count = await Gadget.countDocuments({});
        res.status(200).json(count);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUserCount,
    getReviewCount,
    getProductCount
}