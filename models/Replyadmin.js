const mongoose = require('mongoose')
const ReplyadminSchema = new mongoose.Schema({
    com_reply:{
        type: String,
        required: true
    },
    complaint_type:{
        type: String,
        required: true
    }, 
    roll:{
        type: String,
        required:true
    },
    com_details:{
        type: String,
        required: true
    }, 

   

},{timestamps:true})

//Create Collection
//help is name of collection
//HelpSchema is the field of help collection

const ReplyadminModel = mongoose.model('replyadmin',ReplyadminSchema)


module.exports = ReplyadminModel
