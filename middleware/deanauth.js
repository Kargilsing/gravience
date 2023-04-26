const jwt = require('jsonwebtoken')
const DeanregisterModel = require('../models/Adminregister')


const checkdeanAuth = async(req,res,next)=>{
    // console.log('hello middddddddllee')
    const  {token} = req.cookies
    // console.log(token)
    if(!token){
     
        req.flash('error','Unautherized dean')
        res.redirect('/login')
    }else{
        const data = jwt.verify(token,'dean123')
       

        const dean = await DeanregisterModel.findOne({_id:data.id})
        // console.log(student)
        req.dean = dean
       
       
        
        next()
    }
}

module.exports = checkdeanAuth