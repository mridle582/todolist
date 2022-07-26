const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let tasks = ["Buy Food","Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", (req, res) => {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render('list', {
        day: day,
        tasks: tasks
    });

});

app.post("/", (req, res) => {
    let task = req.body.newTask;
    tasks.push(task);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});