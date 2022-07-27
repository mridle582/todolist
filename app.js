const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`)

const app = express();

const nonWorkTasks = ["Buy Food", "Cook Food", "Eat Food"];
const workTasks = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", (req, res) => {

    const day = date.getDate();

    res.render('list', {
        listTitle: day,
        tasks: nonWorkTasks
    });

});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        tasks: workTasks
    });
});

app.get("/about", (req, res)=> {
    res.render("about");
})

app.post("/", (req, res) => {

    const task = req.body.newTask;

    if (req.body.list === "Work List") {
        workTasks.push(task);
        res.redirect("/work");
    } else {
        nonWorkTasks.push(task);
        res.redirect("/");
    }

});

app.post("/work", (req, res) => {
    const workTask = req.body.newTask;
    workTasks.push(workTask);
    res.redirect("/work");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});