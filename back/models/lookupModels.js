const mongoose = require('mongoose');
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