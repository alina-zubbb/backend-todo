import db from "../../models";

const createTodo = async ctx => {
  try {
    const { text } = ctx.request.body;
    const { _id: userId } = ctx.request.user;

    let todo = new db.Todo({
      userId,
      text,
      timeOfCreation: Date.now()
    });

    todo = await todo.save();

    ctx.status = 200;
    ctx.body = todo;
  } catch (err) {
    ctx.status = 403;
    ctx.body = {
      error: err
    };
  }
};

export default createTodo;
