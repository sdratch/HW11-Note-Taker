const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000; //|| process.env.PORT;

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(data);
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
