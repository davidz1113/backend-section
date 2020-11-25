const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const {
  NotFoundMiddleware,
  ErrorMiddleware,
  AuthMiddleware,
} = require("../middlewares");

module.exports = function ({
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", AuthMiddleware, UserRoutes);
  apiRoutes.use("/idea", AuthMiddleware, IdeaRoutes);
  apiRoutes.use("/comment", CommentRoutes);
  apiRoutes.use("/auth", AuthRoutes);

  router.use("/v1/api", apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
