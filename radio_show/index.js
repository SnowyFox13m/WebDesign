var express = require("express");
var app= express();
var path = require("path");

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

var number_of_users_visiting = 0;
var magic_number = Math.floor(Math.random() * 100) + 1;

app.get("/", function(req, res){
    console.log("a new visitor arrived");
    res.sendFile(__dirname + "\\home.html");
    

app.get("/call", function(req, res){
    if (number_of_users_visiting == magic_number) {
        res.send("yes")
    } else {
        res.send("no")
    }});
    number_of_users_visiting = number_of_users_visiting + 1;
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});