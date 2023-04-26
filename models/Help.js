const mongoose = require('mongoose')
const HelpSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    roll_no:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    message:{
        type: String,
        required:true
       
    }

},{timestamps:true})

//Create Collection
//help is name of collection
//HelpSchema is the field of help collection

const HelpModel = mongoose.model('help',HelpSchema)


module.exports = HelpModel
