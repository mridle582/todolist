const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let nonWorkTasks = ["Buy Food", "Cook Food", "Eat Food"];
let workTasks = [];

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

    let task = req.body.newTask;

    if (req.body.list === "Work List") {
        workTasks.push(task);
        res.redirect("/work");
    } else {
        nonWorkTasks.push(task);
        res.redirect("/");
    }

});

app.post("/work", (req, res) => {
    let workTask = req.body.newTask;
    workTasks.push(workTask);
    res.redirect("/work");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});