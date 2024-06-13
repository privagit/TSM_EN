const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const port = process.env.PORT || 2225;
console.log(process.env.PORT);
const server = require("http").createServer(app);

//Set view engine
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);

//Set static files
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/libs"));

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const pageRouter = require("./routes/page");
// const dropdownRouter = require("./routes/dropdown");

app.use("/", pageRouter);
// app.use("/dropdown", dropdownRouter);

// // Route สำหรับหน้า home
// app.get("/", (req, res) => {
//   res.send("Welcome to the home page!");
// });

//* สร้าง server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

//* route สำหรับหน้า 404
app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});
