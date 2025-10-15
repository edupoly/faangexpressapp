var express = require("express");
var cors = require("cors");
var fs = require("fs");
var multer = require("multer");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
const upload = multer({ dest: "uploads/" });
var app = express();
app.use(cors());
var leadsRouter = require("./routes/lead.routes");
var todosRouter = require("./routes/todos.routes");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "naaku thelidu!!!!" }));
app.use(express.static(__dirname + "/general"));
app.use(express.static(__dirname + "/uploads"));

app.get("/", function (req, res) {
  req.session.username = "balu";
  req.session.password = "123";
  if (req.session.username && req.session.password) {
    res.render("Dashboard");
  } else {
    res.render("Home");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  // res.render("Home")
  res.redirect("/");
});

app.post("/signup", async (req, res) => {
  var data = await fs.promises.readFile("users.txt");
  var f1 = JSON.parse(data.toString());
  f1.push(req.body);
  var result = await fs.promises.writeFile("users.txt", JSON.stringify(f1));
  res.send("<h1>Nuv thopu ra babu</h1>");
});

app.post("/login", async (req, res) => {
  var data = await fs.promises.readFile("users.txt");
  var allusers = JSON.parse(data.toString());
  var r = allusers.find((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      return true;
    }
  });
  if (r) {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    console.log(req.session);
    res.render("Dashboard");
  } else {
    res.send("Credentials chusukobadla");
  }
});

// app.use(function (req, res, next) {
//   console.log(req.session);
//   if (req.session.username && req.session.password) {
//     next();
//   } else {
//     res.redirect("/login.html");
//   }
// });

app.use("/leads", leadsRouter);
app.use("/todos", todosRouter); //http://localhost:3500/todos/myTodos

app.listen(3500, () => {
  console.log("Server running on 3500");
});

//install pug
//create views folder
//congifure views folder with app.set("view engine","pug")
//cookies//sessions//token

// app.get("/", (req, res) => {
//   // var h = fs.readFileSync("Home.html").toString();
//   // res.sendFile(__dirname + "/Home.html");
// });
// // app.get("/aboutus", (req, res) => {
// //   res.sendFile(__dirname + "/Aboutus.html");
// // });
// // app.get("/contactus", (req, res) => {
// //   res.sendFile(__dirname + "/contactus.html");
// // });

// (1/2)*200 // 180/60//1.5 min
