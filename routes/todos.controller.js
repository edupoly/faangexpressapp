var fs = require("fs");

async function mytodos(req, res) {
  var data = await fs.promises.readFile("todos.txt");
  var f1 = JSON.parse(data.toString());
  var userTodos = f1.filter((todo) => {
    if (todo.user === req.session.username) {
      return true;
    }
  });
  res.render("userTodos", { todos: userTodos });
}

const alltodos = async (req, res) => {
  var data = await fs.promises.readFile("todos.txt");
  var f1 = JSON.parse(data.toString());
  res.render("allTodos", { todos: f1 });
};

async function addtodo(req, res) {
  var data = await fs.promises.readFile("todos.txt");
  var f1 = JSON.parse(data.toString());
  f1.push({ todo: req.body.todo, user: req.session.username });
  var result = await fs.promises.writeFile("todos.txt", JSON.stringify(f1));
  res.send("<h1>Ipoindi ra babu</h1>");
}

module.exports = { alltodos, mytodos, addtodo };
