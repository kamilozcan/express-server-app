const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3500;
const app = express();

// Also you can install and import cors then you can use app.use - Has to be .js file

// const cors = require("cors");

// app.use(cors());
// app.use(express.json());

// (.html)? means with or without .html
app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname}); //inside the root dir name we are looking for the view>index.html
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});

//Route handlers
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello.html");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello world!");
//   }
// );

//changing route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);


app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
