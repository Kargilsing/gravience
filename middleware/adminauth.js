const jwt = require('jsonwebtoken')
const AdminregisterModel = require('../models/Adminregister')


const checkAdmintAuth = async(req,res,next)=>{
    // console.log('hello middddddddllee')
    const  {token} = req.cookies
    // console.log(token)
    if(!token){
     
        req.flash('error','Unautherized admin')
        res.redirect('/login')
    }else{
        const admin = jwt.verify(token,'admin123')
        const handler = await AdminregisterModel.findOne({_id:admin.id})
        // console.log(student)
        req.handler = handler
       
        // console.log(admin)

        next()


    }
}

module.exports = checkAdmintAuth