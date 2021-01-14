"use strict";

const express = require("express"),
      app = express(),
      fs = require("fs"),
      port = process.env.PORT || 4000;

// recipe list
let recipes = [];
fs.readdirSync("views/recipes").forEach(recipe => {
    if (recipe != "index.ejs") recipes.push(recipe.slice(0, -4));
});

// project list
let projects = [];
fs.readdirSync("views/projects").forEach(project => {
    if (project != "index.ejs") projects.push(project.slice(0, -4));
});

function ToTitleCase(name) {
    let title = name.toLowerCase().split(" ");
    for (let i = 0; i < title.length; i++)
        title[i] = title[i][0].toUpperCase() + title[i].slice(1);

    return title.join(" ");
}

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/recipes", (req, res) => {
    res.render("pagebuilder", { builderObj: {
        title: "Recipes",
        page: "recipes/index",
        recipes
    }});
});

app.get("/recipes/:recipe", (req, res) => {
    let recipe = req.params.recipe.toLowerCase();

    if (recipes.includes(recipe)) {
        res.render("pagebuilder", {builderObj: {
            title: ToTitleCase(recipe),
            page: `recipes/${recipe}`,
            ToTitleCase
        }});
    }
        
    else
        res.redirect("/recipes");
});

app.get("/projects", (req, res) => {
    res.render("pagebuilder", { builderObj: {
        title: "Projects",
        page: "projects/index",
        projects,
        ToTitleCase
    }});
});

app.get("/projects/:project", (req, res) => {
    let project = req.params.project.toLowerCase();

    if (projects.includes(project))
        res.render("pagebuilder", { builderObj: {
            title: ToTitleCase(project),
            page: `projects/${project}`
        }});
    else
        res.redirect("/projects");
});

app.get("/", (req, res) => {
    res.render("pagebuilder", { builderObj: {
        title: "Home",
        page: "index"
    }});
});

app.use((req, res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});