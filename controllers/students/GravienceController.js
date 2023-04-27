const GravienceModel = require("../../models/Gravience");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djdseaeua",
  api_key: "182689146329852",
  api_secret: "HiGC6iSCQoUBRjYvjS0PrjHWe40",
  // secure: true
});
class GravienceController {
 

  static complaint = async (req, res) => {
    try {
      const complaint = await GravienceModel.findById(req.params.id)
      console.log(complaint)
      
      res.render("students/complainview",{Gra:complaint});
    } catch (error) {
      console.log(error);
    }
  };




  static insertgravience = async (req, res) => {
    try {
      //   console.log(req.body)

      const file = req.files.com_image;

      const image = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "gravienceimage",
      });

      const result = new GravienceModel({
        complaint_type: req.body.complaint_type,
        semester: req.body.semester,
        course_title: req.body.course_title,
        roll: req.body.roll,
        com_details: req.body.com_details,
        com_reply: req.body.com_reply,
        com_image: {
          public_id: image.public_id,
          url: image.secure_url,
        },
      });
      await result.save();
      res.redirect("/student/studentdashboard");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = GravienceController;
