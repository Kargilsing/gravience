const mongoose = require('mongoose')
const GravienceSchema = new mongoose.Schema({
    complaint_type:{
        type: String,
        required: true
    },
    semester:{
        type: String,
        required:true
    },
    course_title:{
        type: String,
        required:true
    },
    roll:{
        type: String,
        required:true
    },
    com_details:{
        type: String,
        required:true
    },
   
    com_image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
   

},{timestamps:true})

//Create Collection
//help is name of collection
//HelpSchema is the field of help collection

const GravienceModel = mongoose.model('gravience',GravienceSchema)


module.exports = GravienceModel
