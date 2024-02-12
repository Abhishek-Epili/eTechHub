const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    gadget_id:{
        type:String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    review_header:{
        type:String,
        required: true
    },
    review_msg:{
        type:String,
        required: true
    },
    review_by:{
        name:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        }
    },
    reported: {
        type: String, // Assuming "reported" can have values like "yes" or "no"
        default: "no" // Set default value to "no" if not provided
    },
    report_txt: String
},{
    timestamps: true
})

module.exports = mongoose.model("Reviews", reviewSchema)
