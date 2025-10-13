var express = require("express");
var router = express.Router();
var todosController = require("./todos.controller");

router.get("/addTodo", (req, res) => res.render("addTodo"));

router.get("/myTodos", todosController.mytodos);

router.get("/allTodos", todosController.alltodos);

router.post("/addTodo", todosController.addtodo);

module.exports = router;
