const getUserData = async ctx => {
  try {
    const { username, imageLink, _id } = ctx.request.user;

    console.log("username 200 OK!", username);

    ctx.status = 200;
    ctx.body = {
      authenticated: true,
      username,
      userId: _id,
      imageLink
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      authenticated: false,
      err: `cannot veryfy`
    };
  }
};

export default getUserData;
