const AdminregisterModel = require('../../models/Adminregister')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

class AdminController{


    static dashboard =async(req,res) =>{
      try{

        const { name, email, C_password, confirm_password,_id } =
        req.handler;
      
      // console.log(image)

      res.render("admin/admindashboard", { n: name, e: email,p: C_password,cp: confirm_password,i:_id
      });

      }catch(error){
        console.log(error)
      }

    }


    static adminregisterinsert= async(req,res)=>{
        try{


       const {name,email,C_password,confirm_password}= req.body
      const student = await AdminregisterModel.findOne({email:email});
      if(student){
        req.flash("error","Email Already exist")
        res.redirect("/registration")

      }else{
        if(name && email && C_password && confirm_password){
          if(C_password && confirm_password){
            const hashC_password = await bcrypt.hash(C_password,10)
            const result = new AdminregisterModel({
              name:name,
              email:email,
              C_password: hashC_password,
              confirm_password:confirm_password

            });
            await result.save();
            
            res.redirect("/adminlogin");
            
          }else{
            req.flash("error","password and confirm password is not match")
            res.redirect("/registration");
            
          }
        }else{
          req.flash("error","password and confirm password is not match")
          res.redirect("/registration");

        }
      }


        }catch(error){
            console.log(error)
        }
    }


    static adminverifylogin = async(req,res)=>{
        try{



             // console.log(req.body)
      const { email, C_password } = req.body;
      if (email && C_password) {
        const admin = await AdminregisterModel.findOne({ email: email });
        if (admin != null) {
          const ismatched = await bcrypt.compare(C_password,admin.C_password)

          // const ismatched = await SregisterModel.findOne({
          //   C_password: C_password,
          // });

          if (ismatched) {
            // genrate  jwt web token
            const token = jwt.sign({id:admin._id},'admin123')
            // console.log(token)
            res.cookie('token',token)

            res.redirect("/admin/admindashboard");
          } else {
            req.flash("error", "email & password does not match");
            res.redirect("/adminlogin");
          }
        } else {
          req.flash("error", "you are not register");
          res.redirect("/adminlogin");
        }
      } else {
        req.flash("error", "all field are required");
        res.redirect("/adminlogin");
      }
        }catch(error){
            console.log(error)
        }
        
    }


    static adminlogout  = async(req,res)=>{
      try{
        res.clearCookie('token')
        res.redirect('adminlogin')

      }catch(error){
        console.log(error)
      }
    }

    static adminupdatePassword = async(req,res)=>{
       try{
        const{oldPassword,newPassword,confirmPassword}=req.body
        const data = await AdminregisterModel.findById(req.params.id)
        const ismatched = await bcrypt.compare(oldPassword,data.C_password)
        if(ismatched){
          if(newPassword == confirmPassword){
            const hashPassword =await bcrypt.hash(newPassword,10)
            const changepassword = await AdminregisterModel.findByIdAndUpdate(req.params.id,{C_password:hashPassword})
            await changepassword.save()
            console.log("password update Successfully")
            req.flash('ok','password update successfully')
            res.redirect("/admin/admindashboard")
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
module.exports = AdminController