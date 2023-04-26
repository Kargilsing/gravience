const express = require('express')
const app = express()
const port = 4500
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session');
var flash = require('connect-flash');

// cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Connect DB
connectdb()
app.use(express.urlencoded({extended:false}))


//for file upload
app.use(fileUpload({useTempFiles:true}));


// for showing the flash message
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000},
    resave: false,
    saveUninitialized:false,
}));

app.use(flash());





// router load
app.use('/',web)


// ejs setup
app.set('view engine','ejs')



 //public file setup
app.use(express.static('public'))




//servrt create 
app.listen(port,() =>{
    console.log('server start localhost:4500')
})