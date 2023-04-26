const SregisterModel = require("../../models/Sregister");
var cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

cloudinary.config({
  cloud_name: "djdseaeua",
  api_key: "182689146329852",
  api_secret: "HiGC6iSCQoUBRjYvjS0PrjHWe40",
  // secure: true
});

class SregisterController {

  

// student Registeration 
  static registrationdisplay = async (req, res) => {
    try {
      const data = await SregisterModel.find();
      console.log(data);
      res.render("admin/Stdregistration/service", { s: data });
    } catch (error) {
      console.log(error);
    }
  };

  static registerinsert = async (req, res) => {
    try {
      // console.log(req.body)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "stregisterImage",
      });
      const {stud_name,email,C_password,Con_password}= req.body
      const student = await SregisterModel.findOne({email:email});
      if(student){
        req.flash("error","Email Already exist")
        res.redirect("/admin/dashboard/Stdregistration/service")

      }else{
        if(stud_name && email && C_password && Con_password){
          if(C_password && Con_password){
            const hashC_password = await bcrypt.hash(C_password,10)
            const result = new SregisterModel({
              stud_name:stud_name,
              email:email,
              C_password: hashC_password,
              Con_password:Con_password,
              roll_no: req.body.roll_no,
              father_name: req.body.father_name,
              Dateofb: req.body.Dateofb,
              course: req.body.course,
              branch: req.body.branch,
              address: req.body.address,
              mobile: req.body.mobile,
              
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
            });
            await result.save();
            res.redirect("/admin/dashboard/Stdregistration/service");
            
          }else{
            req.flash("error","password and confirm password is not match")
            res.redirect("/admin/dashboard/Stdregistration/service");
            
          }
        }else{
          req.flash("error","password and confirm password is not match")
          res.redirect("/admin/dashboard/Stdregistration/service");

        }
      }
      

      
     
    } catch (error) {
      console.log(error);
    }
  };

  static registerview = async (req, res) => {
    try {
      const data = await SregisterModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/Stdregistration/registerview", { views: data });
    } catch (error) {
      console.log(error);
    }
  };

  static registeredit = async (req, res) => {
    try {
      const data = await SregisterModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/Stdregistration/registeredit", { edit: data });
    } catch (error) {
      console.log(error);
    }
  };

  static registerupdate = async (req, res) => {
    try {
//delete img
      const register = await SregisterModel.findById(req.params.id)
      const imageid = register.image.public_id
      await cloudinary.uploader.destroy(imageid)
//update img

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "stregisterImage",
      });

      // console.log(req.body)
      // console.log(req.params.id)
      const update = await SregisterModel.findByIdAndUpdate(req.params.id, {
        stud_name: req.body.stud_name,
        roll_no: req.body.roll_no,
        father_name: req.body.father_name,
        Dateofb: req.body.Dateofb,
        email: req.body.email,
        course: req.body.course,
        branch: req.body.branch,
        address: req.body.address,
        mobile: req.body.mobile,
        C_password: req.body.C_password,
        Con_password: req.body.Con_password,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        }
      });
      await update.save();
      res.redirect("/admin/dashboard/Stdregistration/service");
    } catch (error) {
      console.log(error);
    }
  };

  static registerdelete = async (req, res) => {
    try {
      // delete image code
      const register = await SregisterModel.findById(req.params.id)
      const imageid = register.image.public_id
      await cloudinary.uploader.destroy(imageid)
      // console.log(req.body)
      // console.log(req.params.id)
      await SregisterModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/dashboard/Stdregistration/service");
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, C_password } = req.body;
      if (email && C_password) {
        const student = await SregisterModel.findOne({ email: email });
        if (student != null) {
          const ismatched = await bcrypt.compare(C_password,student.C_password)

          // const ismatched = await SregisterModel.findOne({
          //   C_password: C_password,
          // });

          if (ismatched) {
            // genrate  jwt web token
            const token = jwt.sign({id:student._id},'GRSportal123')
            // console.log(token)
            res.cookie('token',token)

            res.redirect("/student/studentdashboard");
          } else {
            req.flash("error", "email & password does not match");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "you are not register");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "all field are required");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };




}
module.exports = SregisterController;
