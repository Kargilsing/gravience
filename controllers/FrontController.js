const HelpModel = require('../models/Help')
const HomeModel = require('../models/Home')

class FrontController{

    static home = async(req,res) =>{


        try{
            const slider = await HomeModel.find().sort({_id:-1})
            // console.log(slider)
            res.render('home',{b:slider})

        }
        catch(error){
            console.log(error)
        }
        

    }
    static about =(req,res) =>{
        res.render('about')
        
    }
    static GRS =(req,res) =>{
        res.render('GRS')
        

    }
    static features =(req,res) =>{
        res.render('features')

    }

    static benefits =(req,res) =>{
        res.render('benefits')

    }
    static help =(req,res) =>{
        res.render('help')

    }
    static helptinsert = async(req,res)=>{
        try{
            // console.log(req.body)
            const result = new HelpModel({
                name:req.body.name,
                roll_no:req.body.roll_no,
                email:req.body.email,
                mobile:req.body.mobile,
                message:req.body.message
            })
            await result.save()
            // console.log(result)
            // in the  redirect always take the url of riuter
            res.redirect('/help')

        }catch(error){
            console.log(error)
        }
    }


    static loginpo =(req,res) =>{
        res.render('loginpo')

    }



    static login = async(req,res) =>{
        try{
            res.render('login',{message:req.flash('error')})

        }catch(error){
            console.log(error)
        }
        

    }
    static adminlogin = async(req,res)=>{
        try{
            res.render('adminlogin',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }

    static deanlogin = async(req,res)=>{
        try{
            res.render('deanlogin',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }





    static registration =(req,res) =>{
        res.render('registration',{message:req.flash('error')})
    }

    static deanregistration =(req,res)=>{
        res.render('deanregistration',{message:req.flash('error')})
    }

}
module.exports = FrontController