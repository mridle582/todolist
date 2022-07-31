const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const defItems = [new Item({
    name: "Welcome to your todolist!"
}), new Item({
    name: "Hit the + to add a new item."
}), new Item({
    name: "<-- Hit this to delete an item."
})];

Item.insertMany(defItems, (err) => {
    err ? console.log(err) : console.log("Added default list items successfully");
});

app.get("/", (req, res) => {


    Item.find({}, (err, items) => {
        // err ? console.log(err) : console.log(items);
        res.render("list", {
            listTitle: "Today",
            newListItems: items
        });
    });


    // res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", (req, res) => {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
