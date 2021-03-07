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

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", (req, res) => {
    var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(data);
    res.json(data);
});

app.post("/api/notes", (req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    var id = savedNotes.length

    
    newNote.id = id + 1;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("New note has been saved to db.json. Here is what the note says: ", newNote);
    res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteID = parseInt(req.params.id);
    var newID = 1;

    console.log(`Deleting note with following ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    });

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

app.listen(PORT, () => {
    console.log(`Now listening to http://localhost:${PORT}`);
})