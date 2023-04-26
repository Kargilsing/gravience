const GravienceModel = require("../../models/Gravience");
const ReplyadminModel = require("../../models/Replyadmin");

class complaintController {
  static studentcomplaintsdisplay = async (req, res) => {
    try {
      const complaint = await GravienceModel.find().sort({ _id: -1 });
      // console.log(complaint)

      res.render("admin/studentcomplaint/complaintdisplay", { com: complaint });
    } catch (error) {
      console.log(error);
    }
  };

  static complaintreply = async (req, res) => {
    try {
      const complaintreply = await GravienceModel.findById(req.params.id);
      // console.log(complaintreply)

      res.render("admin/studentcomplaint/complaintreply", {
        reply: complaintreply,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static insertreply = async (req, res) => {
    try {
      
      const result = new ReplyadminModel({
        com_reply: req.body.com_reply,
        complaint_type: req.body.complaint_type,
        roll: req.body.roll,
        com_details: req.body.com_details
      });
      await result.save();
      // res.render('admin/studentcomplaint/complaintdisplay')

      res.redirect("/admin/dashboard/viewst_compalintreply");
    } catch (error) {
      console.log(error);
    }
  };

  static viewreply = async (req, res) => {
    try {
      const complaint = await ReplyadminModel.find().sort({ _id: -1 });
      // console.log(complaint)

      res.render("admin/Viewcomplaintreply/studentcomplaintreply", {
        view: complaint,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static replydelete = async (req, res) => {
    try {
      // delete image code

      // console.log(req.body)
      // console.log(req.params.id)
      await ReplyadminModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/dashboard/viewst_compalintreply");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = complaintController;
