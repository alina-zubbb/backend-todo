import jwt from "jsonwebtoken";

import config from "../config";
import db from "../models";

const verifyToken = async (ctx, next) => {
  try {
    const header = ctx.headers["x-authorization-token"];
    const bearer = header.split(" ");
    const bearerToken = bearer[1];
    const token = bearerToken;

    const { _id } = await jwt.verify(token, config.secret);
    ctx.request.user = await db.User.findOne({ _id });
    return await next();
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      authenticated: false,
      err: `cannot veryfy`
    };
  }
};

export default verifyToken;
