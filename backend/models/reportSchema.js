const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    review_id: {
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
    report_txt: {
        type: String
    },
    reported_by: {
        type: String
    },
    report_status:{
        type: String,
        default: "pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Reports", reportSchema);
