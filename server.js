var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "naaku thelidu!!!!" }));
app.use(express.static(__dirname + "/general"));

app.get("/", function (req, res) {
  res.render("Home");
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
  console.log(req.body);
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

app.use(function (req, res, next) {
  console.log(req.session);
  if (req.session.username && req.session.password) {
    next();
  } else {
    res.redirect("/login.html");
  }
});

app.get("/myTodos", async (req, res) => {
  console.log(req.session.username + " requested");
  // res.send("undara babu");
  var data = await fs.promises.readFile("todos.txt");
  var f1 = JSON.parse(data.toString());
  var userTodos = f1.filter((todo) => {
    if (todo.user === req.session.username) {
      return true;
    }
  });
  res.render("userTodos", { todos: userTodos });
});

app.get("/allTodos", async (req, res) => {
  var data = await fs.promises.readFile("todos.txt");
  var f1 = JSON.parse(data.toString());
  res.render("allTodos", { todos: f1 });
});

app.post("/addTodo", async (req, res) => {
  console.log(req.cookies);
  var data = await fs.promises.readFile("todos.txt");
  // console.log(data);
  var f1 = JSON.parse(data.toString());
  f1.push({ todo: req.body.todo, user: req.cookies.username });
  console.log(f1);
  var result = await fs.promises.writeFile("todos.txt", JSON.stringify(f1));
  res.send("<h1>Ipoindi ra babu</h1>");
});

// app.post("/addTodo",(req, res) => {
//   // var f1 = JSON.parse(fs.readFileSync("todos.txt").toString());
//   // f1.push(req.body);
//   // console.log(f1);
//   // fs.writeFileSync("todos.txt", JSON.stringify(f1));

//   // fs.readFile("todos.txt", function (err, data) {
//   //   var f1 = JSON.parse(data.toString());
//   //   f1.push(req.body);
//   //   fs.writeFile("todos.txt", JSON.stringify(f1), (err) => {
//   //     if (!err) {
//   //       res.send("Ipoindi ra babu");
//   //     }
//   //   });
//   // });

//   fs.promises
//     .readFile("todos.txt")
//     .then((data) => {
//       var f1 = JSON.parse(data.toString());
//       f1.push(req.body);
//       fs.writeFile("todos.txt", JSON.stringify(f1), (err) => {
//         if (!err) {
//           res.send("Ipoindi ra babu");
//         }
//       });
//     })
//     .catch(() => {
//       res.send("error vachindi ra babu");
//     });
// });

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
