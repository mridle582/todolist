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

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defItems, (err) => {
                err ? console.log(err) : console.log("Added default list items successfully");
            });
            res.redirect("/");
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
    });

});

app.get("/:customListName", (req, res) => {
    const customListName = req.params.customListName;
    List.findOne({
        name: customListName
    }, (err, foundList) => {
        if (!err) {
            if (foundList) {
                console.log("Found list!");
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            } else {
                const list = new List({
                    name: customListName,
                    items: defItems
                });
                list.save();
                res.redirect(`/${customListName}`);
            }
        } else {
            console.log(err);
            res.redirect("/");
        }
    });
});

app.post("/", (req, res) => {

    const item = new Item({
        name: req.body.newItem
    });

    item.save();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const oldItemID = req.body.checkbox.trim();
    Item.findByIdAndRemove({
        _id: oldItemID
    }, (err) => {
        err ? console.log(err) : console.log(`Item with ID: ${oldItemID} was deleted.`);
    });
    res.redirect("/");
});

// app.get("/work", (req, res) => {
//     res.render("list", {
//         listTitle: "Work List",
//         newListItems: workItems
//     });
// });

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});