const mongoose = require('mongoose')
const HomeSchema = new mongoose.Schema({
    h_title:{
        type: String,
        required: true
    },
    h_description:{
        type: String,
        required:true
    },
    slider:{
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

const HomeModel = mongoose.model('home',HomeSchema)


module.exports = HomeModel
