var express = require("express");
var cors = require("cors");
var fs = require("fs");
var app = express();

app.set("view engine", "pug");

var allproducts = JSON.parse(fs.readFileSync("products.txt").toString());
app.get("/products", function (req, res) {
  // res.send(products);
  res.render("productslist", {
    hobby: "Cricket",
    marks: [10, 20, 15],
    products: allproducts.products,
  });
});
app.get("/details/:id", function (req, res) {
  console.log(req.params.id);
  var selectedProduct = allproducts.products.find((pr) => {
    if (pr.id == req.params.id) {
      return true;
    }
  });
  console.log(selectedProduct);
  res.render("productDetails", { product: selectedProduct });
});
app.listen(3500, () => {
  console.log("Server running on 3500");
});
//install pug
//create views folder
//congifure views folder with app.set("view engine","pug")
