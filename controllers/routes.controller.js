import Router from "koa-router";

import {
  userSignupControler,
  userLoginControler,
  getUserData,
  uploadImage
} from "./auth";
import { createTodo, updateTodo, deleteTodo, getAllTodo } from "./todos";

const publicRouter = () => {
  const router = Router();
  // auth
  router.post("/signUp", userSignupControler);
  router.post("/login", userLoginControler);
  // todos
  return router.routes();
};

const privateRouter = () => {
  const router = Router();
  // auth
  router.get("/getUserData", getUserData);
  router.post("/uploadImage", uploadImage);
  // todos
  router.get("/getAllTodo", getAllTodo);
  router.post("/createTodo", createTodo);
  router.post("/updateTodo", updateTodo);
  router.post("/deleteTodo", deleteTodo);

  return router.routes();
};

export { publicRouter, privateRouter };
