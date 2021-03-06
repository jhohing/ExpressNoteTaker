// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Set up for the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Routes

app.get("/", function(req, res){
    res.send("Welcome to the homepage");
    //res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res){
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8"));
    res.json(data);
});

app.get("/api/notes/:id", function(req, res){
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res){
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    var uniqueID = (savedNotes.length).toString();

    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("New note has been saved to db.json. Here is what the note says: ", newNote);
    res.json(savedNotes);
});

app.delete("api/notes/:id", function(req, res){
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteID = req.params.id;
    var newID = 0;

    console.log(`Deleting note with following ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    });

    for(currNote of savedNotes){
        currNote.id = newID.toString();
        newID++;
    };

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

app.listen(PORT, function () {
    console.log(`Now listening to http://localhost:${PORT}`);
})