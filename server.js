// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up for the Express App
const app = express();
const port = 1021;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Get methods to grab all the required pages and the data to be displayed

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db/json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();

    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("New note has been saved to db.json. Here is what the note says: ", newNote);
    res.json(savedNotes);
});

app.delete("api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;

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

app.listen(port, () => {
    console.log(`Now listening to https://localhost:${port}`);
})