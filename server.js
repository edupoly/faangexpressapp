var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");
app.use(cors());
app.get("/products", (req, res) => {
  fs.readFile("products.txt", (err, buf) => {
    if (err) {
      console.log("error vachadu");
    } else {
      res.send(buf.toString());
    }
  });
});
app.get("/getProductById/:id", (req, res) => {
  var timestamp = Math.random() * 10000;
  console.log(timestamp);
  setTimeout(() => {
    var products = JSON.parse(fs.readFileSync("products.txt").toString());
    res.send(products.find((product) => product.id == req.params.id));
  }, timestamp);
});
app.get("/employees", (req, res) => {
  var buf = fs.readFileSync("employees.txt");
  var data = buf.toString();
  res.send(data);
});
app.get("/students", (req, res) => {
  var buf = fs.readFileSync("students.txt");
  var data = buf.toString();
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Hello Praveen");
});

app.listen(3500, () => {
  console.log("Server running on 3500");
});
// http methods : GET POST PUT DELETE (CRUD)
