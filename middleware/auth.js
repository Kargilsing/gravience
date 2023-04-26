const jwt = require('jsonwebtoken')
const SregisterModel = require('../models/Sregister')

const checkStudentAuth = async(req,res,next)=>{
    // console.log('Hello middleware')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','Unauthorized User')
        res.redirect('/login')

    }else{
        const data = jwt.verify(token,'GRSportal123')
        const student = await SregisterModel.findOne({_id:data.id})
        // console.log(student)
        req.student = student
        next()
        // console.log(data)

    }
       

}





module.exports = checkStudentAuth