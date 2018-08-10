import Router from "koa-router";
import { publicRouter, privateRouter } from "./routes.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const configurePublic = () => {
  const publicRoutes = Router();
  publicRoutes.use(publicRouter());
  return publicRoutes.routes();
};

const configurePrivate = () => {
  const privateRoutes = Router();
  privateRoutes.use(verifyToken).use(privateRouter());
  return privateRoutes.routes();
};

export { configurePublic, configurePrivate };
