const mongoose = require("mongoose");

const Schema = mongoose.Schema

const gadgetschema = new Schema({
    gadgetType:{
        type:String,
        required: true
    },
    gadgetBrand:{
        type:String,
        required:true
    },
    gadgetName:{
        type:String,
        required:true
    },
    gadgetId:{
        type:String,
        required:true
    },
    gadgetImage:{
        type:String,
        required: true
    },
    gadgetPrice:{
        type:Number,
        required:true
    },
    gadgetSpecs:{
        type:Object,
        required:true,
        OS:{
            type:String,
            required:true
        },
        RAM:{
            type:String,
            required:true
        },
        Internal:{
            type:String,
            required:true
        },
        Camera:{
            type:String,
            required:true
        }
    },
    gadgetReviews:{
        type:Object,
        required:true,
        review_id:{
            type:String,
            required:true
        },
        review_by:{
            type:String,
            required:true
        },
        review_text:{
            type:String,
            required:true
        }
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Gadget',gadgetschema)