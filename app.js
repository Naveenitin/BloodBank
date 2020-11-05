var express = require("express");
var bodyParse = require("body-parser");
var app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.static("assets"));
// app.use('/api', api); // redirect API calls
// app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist')); // redirect popper.js jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// ==========================
// ******* ROUTES************
// ==========================


// Home Page
app.get("/",function(req,res){
    res.render("Home");
});









var port = 3000 ;
app.listen(port,()=>{
    console.log("Server is running on port 3000");
})