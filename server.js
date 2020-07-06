const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000 //|| process.env.PORT;


app.get("/notes", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });