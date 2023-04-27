const express = require('express')
const AdminController = require('../controllers/admin/AdminController')
const complaintController = require('../controllers/admin/ComplaintController')
const HelpController = require('../controllers/admin/HelpController')
const HomeComtroller = require('../controllers/admin/HomeController')
const SregisterController = require('../controllers/admin/SregisterController') 
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const GravienceController = require('../controllers/students/GravienceController')
const StudentController = require('../controllers/students/StudentController')
const auth = require('../middleware/auth')
const adminauth = require('../middleware/adminauth')
const deanauth = require('../middleware/deanauth')
const DeanController = require('../controllers/dean/DeanController')


//front controller

// router
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/GRS',FrontController.GRS)
router.get('/features',FrontController.features)
router.get('/benefits',FrontController.benefits)
// help
router.get('/help',FrontController.help)
router.post('/inserthelp',FrontController.helptinsert)
router.get('/loginpo',FrontController.loginpo)
router.get('/login',FrontController.login)
//admin login registrartion
router.get('/adminlogin',FrontController.adminlogin)
router.get('/Registration',FrontController.registration)






//dean login registration
router.get('/deanlogin',FrontController.deanlogin)
router.get('/deanRegistration',FrontController.deanregistration)
//dean controller router
router.get('/dean/deandashboard',deanauth,DeanController.deandashboard)
router.post('/deanregister',DeanController.deanregisterinsert)
router.post('/verifydeanlogin',DeanController.deanverifylogin)
router.get('/deanlogout',DeanController.deanlogout)
 //dean controller  dashboard

 router.get('/deangraviencedisplay',DeanController.deangraviencedisplay)
 router.get('/solvecomplaintdisplay',DeanController.solvecomplaintdisplay)
 router.get('/massagetoadmin',DeanController.massagetoadmin)
 router.post('/deanchangepassword/:id',DeanController.deanchangePassword)

 












// Admin Controller router
router.get('/admin/admindashboard',adminauth,AdminController.dashboard)
router.post('/register',AdminController.adminregisterinsert)
router.post('/verifyadminlogin',AdminController.adminverifylogin)
router.get('/adminlogout',AdminController.adminlogout)
router.post('/adminchangepassword/:id',AdminController.adminupdatePassword)
// admin home router
router.get('/admin/dashboard/home/slider',HomeComtroller.slider)
router.post('/sliderinsert',HomeComtroller.sliderinsert)

router.get('/sliderdelete/:id',HomeComtroller.sliderdelete)
//admin help router
router.get('/admin/dashboard/help/services',HelpController.service)
router.get('/helpdelete/:id',HelpController.helpdelete)
//admin studentRegistration router
router.get('/admin/dashboard/stdregistration/service',SregisterController.registrationdisplay)
router.post('/registrationinsert',SregisterController.registerinsert)
router.get('/registerview/:id',SregisterController.registerview)
router.get('/registeredit/:id',SregisterController.registeredit)
router.post('/registrationupdate/:id',SregisterController.registerupdate)
router.get('/registerdelete/:id',SregisterController.registerdelete)

router.post('/verifylogin',SregisterController.verifylogin)
//admin view complaind 
router.get('/admin/dashboard/stdregistration/studentcomplaints',complaintController.studentcomplaintsdisplay)
router.get('/complaintreply/:id',complaintController.complaintreply)
router.post('/insertreply',complaintController.insertreply)

router.get('/replydelete/:id',complaintController.replydelete)


// admin view student complaint reply
router.get('/admin/dashboard/viewst_compalintreply',complaintController.viewreply)







//Student router
router.get('/student/studentdashboard',auth,StudentController.dashboard)
router.get('/studentlogout',StudentController.logout)
router.post('/stprofileupdate/:id',auth,StudentController.updateprofile)
//student gravience insert
router.post('/insertgravience',auth,GravienceController.insertgravience)
//complaint view
router.get('/complaint/:id',auth,GravienceController.complaint)
router.post('/changepassword/:id',auth,StudentController.updatePassword)
router.get('/solvedcomplaint',StudentController.solvedcomplaint)










module.exports = router