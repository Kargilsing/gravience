const SregisterModel = require("../../models/Sregister");
const GravienceModel = require("../../models/Gravience");
var cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const ReplyadminModel = require("../../models/Replyadmin");

cloudinary.config({
  cloud_name: "djdseaeua",
  api_key: "182689146329852",
  api_secret: "HiGC6iSCQoUBRjYvjS0PrjHWe40",
  // secure: true
});

class StudentController {
  static dashboard = async (req, res) => {
    try {
      
      const { stud_name, email, roll_no, course, mobile, branch, _id, image } =
        req.student;
      const view = await GravienceModel.find({ roll: roll_no });
      const v1 =await ReplyadminModel.findOne({roll:roll_no})
      console.log(v1)

      res.render("students/studentdashboard", { n: stud_name, e: email,r: roll_no,c: course,m: mobile,b: branch,i: _id,g: image,
        v: view,v12:v1
      });
    } catch (error) {
      console.log(error);
    }
  };

  static logout = (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  static updateprofile = async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files.image);

      const profile = await SregisterModel.findById(req.params.id);
      const imageid = profile.image.public_id;
      await cloudinary.uploader.destroy(imageid);

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "stregisterImage",
      });
      const update = await SregisterModel.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        mobile: req.body.mobile,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await update.save();
      res.redirect("/student/studentdashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static updatePassword = async (req,res) => {
    try {
      const{oldPassword,newPassword,confirmPassword} = req.body
      const data =await SregisterModel.findById(req.params.id)
      // console.log(data)
      const ismatched = await bcrypt.compare(oldPassword,data.C_password)
      if(ismatched){
        if(newPassword == confirmPassword){
          const hashPassword = await bcrypt.hash(newPassword,10)
          const changepassword = await SregisterModel.findByIdAndUpdate(req.params.id,{
             
            C_password:hashPassword
          })
          await changepassword.save()
          
          console.log("Password update sucessfully")
          req.flash('ok','Password upadate successfully')
          res.redirect("/student/studentdashboard" )


        }else{
          console.log("Password and confirm password  does not match")

        }
       
      }else{
        console.log("old password does not match")
      }

      // console.log(req.body)
    } catch (error) {
      console.log(error);
    }
  };



  static solvedcomplaint = async(req,res)=>{
    try{
      const data = await ReplyadminModel.find()
      console.log(data)
         
       res.render('students/solvedcomplaint',{re:data})

    }catch(error){
      console.log(error)
    }

  }






}
module.exports = StudentController;
