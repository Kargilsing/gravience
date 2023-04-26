const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/GRSportal"

const live_url ="mongodb+srv://kargilsingh5:kargil123@cluster1.uujx3pc.mongodb.net/Gravience_express_portal?retryWrites=true&w=majority"





const connetDB =()=>{
    return mongoose.connect(live_url)

    .then(()=>{
        console.log("Database Connected...")
    })
    .catch((error)=>{
        console.log(error)

    })

}
module.exports = connetDB