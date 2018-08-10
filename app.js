import Koa from "koa";
import mongoose from "mongoose";
import logger from "koa-logger";
import koaBody from "koa-body";

import cors from "koa2-cors";
import serve from "koa-static";

import config from "./config";
import { configurePublic, configurePrivate } from "./controllers";

const app = new Koa();

mongoose.connect(
  config.database,
  { useNewUrlParser: true },
  () => {
    console.log("db connected");
  }
);

app
  .use(logger())
  .use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: __dirname + "/upload",
        keepExtensions: true
      }
    })
  )
  .use(cors())
  .use(serve(__dirname + "/upload"))
  .use(configurePublic())
  .use(configurePrivate())

  .use(async ctx => {
    ctx.body = "hi";
  });

app.listen(config.port, () => console.log(`app works on ${config.port} port`));
