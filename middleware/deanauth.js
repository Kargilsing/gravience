const jwt = require('jsonwebtoken')
const DeanregisterModel = require('../models/Deanregister')


const checkdeanAuth = async(req,res,next)=>{
    // console.log('hello middddddddllee')
    const  {token12} = req.cookies
    // console.log("hello" + token12)
    if(!token12){
     
        req.flash('error','Unautherized dean')
        res.redirect('/login')
    }else{
        const data = jwt.verify(token12,'dfnmf dfnmerwjhj')
        // console.log(data)
       

        const dean = await DeanregisterModel.findOne({_id:data.id})
        // console.log(dean)
        req.dean = dean
        console.log(req.dean)
       
       
        
        next()
    }
}

module.exports = checkdeanAuth