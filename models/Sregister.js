const mongoose = require('mongoose')
//define Schema
const SregisterSchema = new mongoose.Schema({
    stud_name:{
        type: String,
        required:true
    },
    roll_no:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    father_name:{
        type: String,
        required:true
    },
    Dateofb:{
        type: String,
        required:true
       
    },
    course:{
        type: String,
        required:true
       
    },
    branch:{
        type: String,
        required:true
       
    },
    address:{
        type: String,
        required:true
       
    },
    mobile:{
        type: String,
        required:true
       
    },
    C_password:{
        type: String,
        required:true
       
    },
    Con_password:{
        type: String,
        required:true
       
    },
    image:{
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

const SregisterModel = mongoose.model('register',SregisterSchema)


module.exports = SregisterModel
