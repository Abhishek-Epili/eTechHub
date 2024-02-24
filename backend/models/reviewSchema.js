const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    gadget_id: {
        type: String,
        required: true
    },
    gadget_name:{
        type:String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review_header: {
        type: String,
        required: true
    },
    review_msg: {
        type: String,
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
    },
    legit: {
        type: String,
        default: "yes"
    },
    report: {
        type: {
            reported: {
                type: String,
                default: "no"
            },
            report_txt: {
                type: String,
                default: ""
            },
            reported_by: {
                type: String,
                default: ""
            }
        },
        default: {}
    },
    verified_user: {
        type: String,
        default: "pending"
    },
    file: {
        data: Buffer, // Storing file data as Buffer
        contentType: String // Storing file content type
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Reviews", reviewSchema);
