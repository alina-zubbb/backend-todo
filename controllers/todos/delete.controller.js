import db from "../../models";

const deleteTodo = async ctx => {
  const { itemId } = ctx.request.body;

  console.log("========ctx.request.body", ctx.request.body);

  if (!itemId) {
    ctx.status = 406;
    ctx.body = {
      res: "ERRor"
    };
  }

  try {
    const removed = await db.Todo.findByIdAndRemove(itemId);
    console.log("--------removed", removed);
    ctx.status = 200;
    ctx.body = {
      itemId
    };
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      err: e
    };
  }
};

export default deleteTodo;
