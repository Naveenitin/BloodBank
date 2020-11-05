var express = require("express");
var mongoose = require("mongoose");
var bodyParse = require("body-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./modules/user"); 
var blood = require("./modules/blood"); 
var admin = require("./modules/admin"); 

var URL = process.env.databaseURL || 'mongodb://localhost:27017/Blood-Bank' ;
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(require("express-session")({
    secret:"This is used encode and decode session,this can be anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.static("assets"));
// app.use('/api', api); // redirect API calls
// app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist')); // redirect popper.js jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//  passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// ==========================
// ******* ROUTES************
// ==========================


// Home Page
app.get("/",function(req,res){
    res.render("Home");
});


// User
app.get("/user",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    User.register(new User({username: req.body.id,name: req.body.name,type: req.body.type,email: req.body.email}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.send("Welcome to jungle.");
        });
    });
});








//  function is used to check to whether user is logged in or not
//  this is used as middle function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//  this is function prevent access and login page from loged in user.
function prevent(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}


//Server starting
var port = 3000 ;
app.listen(port,()=>{
    console.log("Server is running on port 3000");
})