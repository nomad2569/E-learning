import express from "express";
import routes from "./routes";
import {
  home,
  getJoin,
  lectureDetail,
  getLogin,
  getUserDetail,
  getWriteNotice,
  postJoin,
  postLogin,
  logout,
  postWriteNotice,
  getMakeLecture,
  getSeeLectures,
  postSeeLectures,
  postMakeLecture,
  postUserDetail,
  newNotices,
  postChangePassword,
  getChangePassword,
} from "./globalController";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.changePassword, getChangePassword);
globalRouter.post(routes.changePassword, postChangePassword);

globalRouter.get(routes.newNotices(), newNotices);

globalRouter.get(routes.makeLecture(), getMakeLecture);
globalRouter.post(routes.makeLecture(), postMakeLecture);

globalRouter.get(routes.seeLectures, getSeeLectures);
globalRouter.post(routes.seeLectures, postSeeLectures);

globalRouter.get(routes.lectureDetail(), lectureDetail);

globalRouter.get(routes.writeNotice(), getWriteNotice);
globalRouter.post(routes.writeNotice(), postWriteNotice);

globalRouter.get(routes.userDetail(), getUserDetail);
globalRouter.post(routes.userDetail(), postUserDetail);
