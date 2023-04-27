const HomeModel = require("../../models/Home");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "djdseaeua",
    api_key: "182689146329852",
    api_secret: "HiGC6iSCQoUBRjYvjS0PrjHWe40",
    // secure: true
  });



class HomeComtroller{


    static slider =async(req,res) =>{

        try {
            const data = await HomeModel.find();
           
            res.render("admin/home/slider", { hs: data });
          } catch (error) {
            console.log(error);

          }
       
    }


    static sliderinsert = async(req,res)=>{
        try{
            // res.render('/admin/home/slider')
             // console.log(req.body)
      const file = req.files.slider;
      const myslider = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "sliderImage",
      });
      const result = new HomeModel({
        h_title: req.body.h_title,
        h_description: req.body.h_description,
        slider: {
          public_id: myslider.public_id,
          url: myslider.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/dashboard/home/slider");
        }catch(error){
        console.log(error)
        }
       
    }

    static sliderdelete = async (req, res) => {
        try {
          // console.log(req.body)
          // console.log(req.params.id)
          await HomeModel.findByIdAndDelete(req.params.id);
    
          res.redirect("/admin/dashboard/home/slider");
        } catch (error) {
          console.log(error);
        }
      };






}
module.exports = HomeComtroller