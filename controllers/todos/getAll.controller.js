import db from "../../models";

const getAllTodo = async ctx => {
  try {
    let todos = await db.Todo.find({}, function(err, todos) {});
    ctx.status = 200;
    ctx.body = todos;
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      err: e
    };
  }
};

export default getAllTodo;
