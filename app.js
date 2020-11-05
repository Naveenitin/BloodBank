var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var user = require("./modules/user"); 
var blood = require("./modules/blood"); 
var admin = require("./modules/admin"); 

var URL = process.env.databaseURL || 'mongodb://localhost:27017/Blood-Bank' ;
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"This is used encode and decode session,this can be anything",
    resave: false,
    saveUninitialized: false
}));


app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.static("assets"));
// app.use('/api', api); // redirect API calls
// app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist')); // redirect popper.js jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.use(passport.initialize());
app.use(passport.session());
//  passport configuration
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());





// ==========================
// ******* ROUTES************
// ==========================


// Home Page
app.get("/",function(req,res){
    res.render("Home");
});


// Create User
//  show sign up form
app.get("/user",prevent,function(req,res){
    res.render("user");
});

//  handling user sign up
app.post("/register",function(req,res){
    user.register(new user({username: req.body.username,name: (req.body.firstname+" "+req.body.lastname),type: req.body.type,email: req.body.email}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('user');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/userDashboard");
        });
    });
});

// LOGIN ROUTES
// render login form
app.get("/userLogin",prevent,function(req,res){
    res.render("userLogin");
});

//login logic
app.post("/userLogin",passport.authenticate("local",{
    successRedirect: "/userDashboard",
    failureRedirect: "/userLogin"
}),function(req,res){
});

//
app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
});

//User dashboard
app.get("/userDashboard",isLoggedIn,function(req,res){
    res.render("userDashboard",{user:req.user});
});



//  function is used to check to whether user is logged in or not
//  this is used as middle function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    console.log("You are not logged in");
    res.redirect("/userLogin");
}
//  this is function prevent access and login page from loged in user.
function prevent(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    console.log("Not attenticated");
    res.redirect("/userLogin");
}

// default route if nothing match
app.get("*",(req,res)=>{
    res.send("Sorry!!!! This Webpage is not available");
});

//Server starting
var port = 3000 ;
app.listen(port,()=>{
    console.log("Server is running on port 3000");
})