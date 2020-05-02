import express from "express";
import routes from "./routes";
import {
  home,
  join,
  lectureDetail,
  login,
  userDetail,
  writeNotice,
} from "./globalController";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.lectureDetail(), lectureDetail);
globalRouter.get(routes.userDetail, userDetail);
globalRouter.get(routes.writeNotice, writeNotice);
