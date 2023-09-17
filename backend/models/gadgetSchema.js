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
    gadgetImage:{
        type:String,
        required: true
    },
    gadgetPrice:{
        type:Number,
        required:true
    },
    gadgetSpecs:{
        type:Object
    },
    rating:{
        type:Number,
        required: true
    },
    buy_links:{
        type:Object,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Gadget',gadgetschema)