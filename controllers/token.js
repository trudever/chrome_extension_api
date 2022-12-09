const tokenRouter = require("express").Router();
const { tokenExtractor, userExtractor } = require("../utils/middleware");

tokenRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const user = request.user;
    if (!user) return response.status(400).send("user not found");
    response.status(200).json(user);
  }
);

module.exports = tokenRouter;
