var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/addStudent", (req, res) => {
  var students = fs.readFileSync("students.txt").toString();
  console.log(typeof students);
  console.log(typeof JSON.parse(students));
  // console.log(req.body);
  var k = JSON.parse(students);
  // console.log(typeof k);
  k.push(req.body);
  console.log(k);
  fs.writeFileSync("students.txt", JSON.stringify(k));
  res.send("Please wait");
});

app.get("/add", function (req, res) {
  console.log(req.query);
  res.send(+req.query.num1 + +req.query.num2);
});
app.post("/add", function (req, res) {
  console.log(req.body);
  res.send("Undara nayana");
});
app.get("/abc", function (req, res) {
  console.log("get request for abc route recieved");
  res.header("Content-Type", "text/plain");
  // res.contentType = "text/html";
  res.send("AAgura babu");
});

app.post("/abc", function (req, res) {
  console.log("POST request for abc route recieved");
  res.send("AAgura babu");
});
app.put("/abc", function (req, res) {
  console.log("PUT request for abc route recieved");
  res.send("AAgura babu");
});
app.delete("/abc", function (req, res) {
  console.log("DELETE request for abc route recieved");
  res.send("AAgura babu");
});

app.get("/add/:n1/:n2", (req, res) => {
  res.send(+req.params.n1 + +req.params.n2);
});

app.get("/mul/:n1/:n2", (req, res) => {
  res.send(req.params.n1 * req.params.n2);
});

app.listen(3500, () => {
  console.log("Server running on 3500");
});
// http methods : GET POST PUT DELETE (CRUD)
