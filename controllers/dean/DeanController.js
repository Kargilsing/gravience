

const DeanregisterModel = require("../../models/Deanregister");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

class DeanController {

    static deandashboard = async(req,res)=>{
      try{
       
      

      res.render("dean/deandashboard");
      
      

      }catch(error){   
        console.log(error)
      }
    }


    static deanregisterinsert = async(req,res)=>{
        try{
            const {name,email,C_password,confirm_password}= req.body
      const dean = await DeanregisterModel.findOne({email:email});
      if(dean){
        req.flash("error","Email Already exist")
        res.redirect("/registration")

      }else{
        if(name && email && C_password && confirm_password){
          if(C_password && confirm_password){
            const hashC_password = await bcrypt.hash(C_password,10)
            const result = new DeanregisterModel({
              name:name,
              email:email,
              C_password: hashC_password,
              confirm_password:confirm_password

            });
            await result.save();
           
            res.redirect("/deanlogin");
            
          }else{
            req.flash("error","password and confirm password is not match")
            res.redirect("/deanregistration");
            
          }
        }else{
          req.flash("error","password and confirm password is not match")
          res.redirect("/deanregistration");

        }
      }
        }catch(error){
            console.log(error)
        }
    }


    static deanverifylogin = async(req,res)=>{
        try{



             // console.log(req.body)
      const { email, C_password } = req.body;
      if (email && C_password) {
        const dean = await DeanregisterModel.findOne({ email: email });
        if (dean != null) {
          const ismatched = await bcrypt.compare(C_password,dean.C_password)

          // const ismatched = await SregisterModel.findOne({
          //   C_password: C_password,
          // });

          if (ismatched) {
            // genrate  jwt web token
            const token = jwt.sign({id:dean._id},'dean123')
            // console.log(token)
            res.cookie('token',token)
            
            res.redirect("/dean/deandashboard");
          } else {
            req.flash("error", "email & password does not match");
            res.redirect("/deanlogin");
          }
        } else {
          req.flash("error", "you are not register");
          res.redirect("/deanlogin");
        }
      } else {
        req.flash("error", "all field are required");
        res.redirect("/deanlogin");
      }







        }catch(error){
            console.log(error)
        }
        
    }



    static deanlogout  = async(req,res)=>{
        try{
          res.clearCookie('token')
          res.redirect('deanlogin')
  
        }catch(error){
          console.log(error)
        }
      }
    



 static deanupdatePassword =async(req,res)=>{
   res.render('dean/deanupdatepassword')
 }

 static deangraviencedisplay = async(req,res)=>{
  res.render('dean/graviencedisplay')
 }
  static solvecomplaintdisplay = async(req,res)=>{
    res.render('dean/solvecomplaints')
  }

  static massagetoadmin = async(req,res)=>{
    res.render('dean/sendmassagetoadmin')
  }




  static deanchangePassword = async(req,res)=>{
    try{
     const{oldPassword,newPassword,confirmPassword}=req.body
     const data = await DeanregisterModel.findById(req.params.id)
     const ismatched = await bcrypt.compare(oldPassword,data.C_password)
     if(ismatched){
       if(newPassword == confirmPassword){
         const hashPassword =await bcrypt.hash(newPassword,10)
         const changepassword = await DeanregisterModel.findByIdAndUpdate(req.params.id,{C_password:hashPassword})
         await changepassword.save()
         console.log("password update Successfully")
         req.flash('ok','password update successfully')
         res.redirect("/dean/deandashboard")
       }else{
         console.log("password and confirm password does not match")

       }

     }else{
       console.log("old password does not match")
     }


    }catch(error){
     console.log(error)
    }
 }







}
module.exports = DeanController