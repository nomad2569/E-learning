import express from "express";
import routes from "./routes";
import {
  home,
  getJoin,
  lectureDetail,
  getLogin,
  userDetail,
  writeNotice,
  postJoin,
  postLogin,
  logout,
} from "./globalController";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.lectureDetail(), lectureDetail);

globalRouter.get(routes.userDetail, userDetail);

globalRouter.get(routes.writeNotice, writeNotice);
