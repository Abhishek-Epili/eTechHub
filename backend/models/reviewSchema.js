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
        type:Object,
        required: true,
        name:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        }
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Reviews",reviewSchema)