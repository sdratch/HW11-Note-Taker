const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT;

let idCount = 1;

//basic code to allow for app to work
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",express.static(path.join(__dirname, "public")))

//get the notes html 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//get the notes api in json 
app.get("/api/notes", (req, res) => {
  //read the notes from the database
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(JSON.parse(data));
    }
  });
});
//To handle the POST request of a new note
app.post("/api/notes", (req, res) => {
  let newNote = (req.body);
  //give the note an idea and increase the id count
  newNote.id = idCount;
  idCount++;
  //read the file to understand what it is in it
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      //add the note to the file
      data = JSON.parse(data);
      data.push(newNote);
      data = JSON.stringify(data)
      //rewrite the file
      fs.writeFile(path.join(__dirname, "db/db.json"),data,"utf8",(err) => {
          if (err) {
            throw err;
          }
        }
      );
    }
  });
  res.json(req.body);
});

//Handles the delete note request
app.delete("/api/notes/:id", (req, res)=>{
  //uses the id to find the note
    const id = req.params.id
    //reads the file of notes
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
        if (err) {
          throw err;
        } else {
          //filters out the note with that specific id
            const newData = JSON.parse(data).filter((obj)=> obj.id != id)
            //create a new file without the note
            fs.writeFileSync(path.join(__dirname, "db/db.json"),JSON.stringify(newData),"utf8");
        }
    })
    res.end()
})
//Send the user to the home page if anything gets inputed in the address bar
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//listening on the port
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
