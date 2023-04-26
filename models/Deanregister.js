const mongoose = require('mongoose')
const DeanregisterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    C_password:{
        type: String,
        required:true
    },
    confirm_password:{
        type: String,
        required:true
    }
   

},{timestamps:true})

//Create Collection
//help is name of collection
//HelpSchema is the field of help collection

const DeanregisterModel = mongoose.model('deanregister',DeanregisterSchema)


module.exports = DeanregisterModel
