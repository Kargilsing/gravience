const HelpModel = require("../../models/Help")

class HelpController{





    static service = async(req,res)=>{
        try{

            const data = await HelpModel.find()
            // console.log(data)
            res.render('admin/help/service',{d:data})
            

        }catch(error){
            console.log(error)
        }
    }

    static  helpdelete = async(req,res)=>{
        try{
            await HelpModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/dashboard/help/services')

        }catch(error){
            console.log(error)
        }
    }



}
module.exports = HelpController