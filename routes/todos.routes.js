var express = require("express");
var router = express.Router();
var multer = require("multer");
var todosController = require("./todos.controller");
const upload = multer({ dest: "uploads/" });

router.get("/addTodo", (req, res) => res.render("addTodo"));

router.get("/myTodos", todosController.mytodos);

router.get("/allTodos", todosController.alltodos);

router.post("/addTodo", upload.single("todoPic"), todosController.addtodo);

module.exports = router;
