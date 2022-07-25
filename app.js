const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var tasks = ["Buy Food","Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render('list', {
        day: day,
        tasks: tasks
    });

});

app.post("/", (req, res) => {
    var task = req.body.newTask;
    tasks.push(task);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});