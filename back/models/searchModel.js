const mongoose = require('mongoose');

// Unused mongodb schema

const lookupTemplate = new mongoose.Schema({
    buildingType:{
        type:String,
        required:true
    },
    locationX:{
        type:Number
    },
    locationY:{
        type:Number
    }
})

module.exports = mongoose.model('macedonia',lookupTemplate)