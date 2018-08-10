import bcrypt from "bcrypt";
import db from "../../models";

const userSignupControler = async ctx => {
  const { username, password } = ctx.request.body;
  console.log("username, password", username, password);
  if (!username || !password) {
    ctx.status = 406;
    ctx.body = {
      authenticated: false,
      message: "Invalid query",
      username: username,
      password: password
    };
    return;
  }

  try {
    const passwordHash = bcrypt.hashSync(password, 2);
    const user = new db.User({
      username,
      password: passwordHash
    });
    const newUser = await user.save();
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `You signed up as ${newUser.username}`
    };
  } catch (err) {
    ctx.status = 403;
    const message = err.errors;
    ctx.body = {
      err: err.errors
    };
  }
};

export default userSignupControler;
