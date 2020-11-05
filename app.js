var app = require("express")();
var bodyParse = require("body-parser");



app.get("/",function(req,res){
    res.send("Hi from Naveen Gaur.");
});


var port = 3000 ;
app.listen(port,()=>{
    console.log("Server is running on port 3000");
})