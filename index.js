"use strict";

const express = require("express"),
      app = express(),
      fs = require("fs"),
      port = process.env.PORT || 4000;

function AddSitewideContent(page) {
    const file = __dirname + "/public/" + page + ".html";
    let content = fs.readFileSync(file, "utf8");
    content = AddHeader(content);
    content = AddFooter(content);
    return content;
}

function AddHeader(content) {
    return fs.readFileSync(__dirname + "/public/templates/header.html") + content;
}

function AddFooter(content) {
    return content + fs.readFileSync(__dirname + "/public/templates/footer.html");
}

app.use(express.urlencoded({ extended: true}));

app.use("/", express.static("public"));
app.use("/projects", (req, res) => {
    res.send(AddSitewideContent("/index"));
    
});
app.use("/recipes", express.static("public/recipes"));
app.get("/recipes/:recipe", (req, res) => {
    res.send(content);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});