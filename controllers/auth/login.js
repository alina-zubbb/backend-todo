import config from "../../config";
import jwt from "jsonwebtoken";
import db from "../../models";

const userLoginControler = async ctx => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.status = 400;
    ctx.body = {
      authenticated: false,
      message: "Invalid query"
    };
    return;
  }
  try {
    const user = await db.User.findOne({ username });
    if (user) {
      const checkPassword = await user.checkPassword(password);
      if (checkPassword) {
        ctx.status = 200;
        const token = jwt.sign({ _id: user._id }, config.secret);
        ctx.body = {
          authenticated: true,
          username: user.username,
          token,
          id: user["_id"],
          imageLink: user.imageLink
        };
      } else {
        ctx.status = 201;
        ctx.body = {
          authenticated: false,
          message: "Invalid password"
        };
      }
    } else {
      ctx.status = 202;
      ctx.body = {
        authenticated: false,
        message: "Invalid user name"
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export default userLoginControler;
