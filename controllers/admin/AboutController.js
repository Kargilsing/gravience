class AboutController{


    static slider =(req,res) =>{
        res.render('admin/about/slider')
    }



    static service = (req,res)=>{
        res.render('admin/about/service')
    }



}
module.exports = AboutController