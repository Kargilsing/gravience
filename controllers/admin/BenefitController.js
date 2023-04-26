class BenefitController{


    static slider =(req,res) =>{
        res.render('admin/benefits/slider')
    }



    static service = (req,res)=>{
        res.render('admin/benefits/service')
    }



}
module.exports = BenefitController