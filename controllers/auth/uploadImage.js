import db from "../../models";

const uploadImage = async ctx => {
  const userId = ctx.request.user._id;

  const filePath = ctx.request.files.image.path;

  const name = filePath.slice(filePath.lastIndexOf("/") + 1);

  const link = `${ctx.request.protocol}://${ctx.request.host}/${name}`;
  console.log("link", link);

  const user = await db.User.findOneAndUpdate(userId, {
    $set: { imageLink: link }
  });

  if (user) {
    ctx.status = 200;
    ctx.body = {
      imageLink: link
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Invalid query"
    };
  }
};

export default uploadImage;
