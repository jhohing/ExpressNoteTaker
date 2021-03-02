// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Set up for the Express App
var app = express();
var port = 1021;
var mainDir = path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Get methods to grab all the required pages and the data to be displayed

// app.get("/notes", function(req, res){
//     res.sendFile(path.join(mainDir, "notes.html"));
// });

// app.get("*", function(req, res){
//     res.sendFile(path.join(mainDir, "index.html"));
// });

// app.get("/api/notes", function(req, res){
//     res.sendFile(path.join(__dirname, "/db/db.json"));
// });

// app.get("/api/notes/:id", function(req, res){
//     var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     res.json(savedNotes[Number(req.params.id)]);
// });

app.listen(port, () => {
    console.log("Now listening to https://localhost:" + port);
})