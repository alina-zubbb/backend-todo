import db from "../../models";

const updateTodo = async ctx => {
  try {
    const { itemId, text, done } = ctx.request.body;

    if (!itemId || !text || !done) {
      ctx.status = 406;
      ctx.body = {
        res: "ERRor"
      };
    }

    await db.Todo.findByIdAndUpdate(itemId, {
      $set: { text, done }
    });

    const updated = await db.Todo.findById(itemId);

    ctx.status = 200;
    ctx.body = updated;
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      err: e
    };
  }
};

export default updateTodo;
