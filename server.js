const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000; //|| process.env.PORT;

let idCount = 1;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",express.static(path.join(__dirname, "public")))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(JSON.parse(data));
    }
  });
});
app.post("/api/notes", (req, res) => {
  let newNote = (req.body);
  newNote.id = idCount;
  idCount++;
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      data = JSON.parse(data);
      data.push(newNote);
      data = JSON.stringify(data)
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
