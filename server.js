var express = require("express");
var multer = require("multer");
var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
const upload = multer({ dest: "uploads/" });
var app = express();
app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Ela unnav mike");
});

app.post("/addUser", upload.single("profilePic"), (req, res) => {
  console.log(req.body);
  var f1 = fs.readFileSync(req.file.path);
  fs.renameSync(req.file.path, "./uploads/" + req.file.originalname);
  console.log(f1);
  res.send("Pola adiripola");
});

app.listen(3500, () => {
  console.log("Server running on 3500");
});
// http methods : GET POST PUT DELETE (CRUD)
