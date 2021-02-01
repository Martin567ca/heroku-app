const mongoose = require('mongoose');

// Mongodb schema used to search through database

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

module.exports = mongoose.model('mytable',lookupTemplate)