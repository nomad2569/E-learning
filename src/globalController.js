import passport from "passport";
import routes from "./routes";
import User from "./models/User";
import Lecture from "./models/Lecture";
import Notice from "./models/Notice";

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

export const home = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("lectures")
      .populate({
        path: "lectures",
        populate: { path: "professor", select: "name" },
      });

    res.render("home", { pageTitle: "home", user });
  } catch (error) {
    res.render("home", { pageTitle: "home" });
  }
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { accessor, schoolId, name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      if (password.length < 8) {
        res.redirect(routes.join);
      }

      if (accessor == 1) {
        const newUser = await User({
          isStudent: true,
          schoolId,
          email,
          name,
        });
        await User.register(newUser, password);
      } else if (accessor == 2) {
        const newUser = await User({
          isProf: true,
          schoolId,
          email,
          name,
        });
        await User.register(newUser, password);
        next();
      }
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "changePassword" });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { currentPassword, password, password2 },
  } = req;
  try {
    if (password !== password2) {
      res.status(400);
      res.redirect(routes.changePassword);
      return;
    }

    await req.user.changePassword(currentPassword, password);

    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    res.redirect(routes.changePassword);
  }
};
export const lectureDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const lecture = await Lecture.findById(id)
      .populate({
        path: "notices",
        populate: { path: "creator", select: "name" },
      })
      .populate({
        path: "professor",
        select: "name",
      });
    res.render("lectureDetail", { pageTitle: "lectureDetail", lecture });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getUserDetail = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.render("userDetail", { pageTitle: "userDetail", user });
};
export const postUserDetail = async (req, res) => {
  try {
    const {
      body: { name, schoolId },
      user: { id },
    } = req;
    await User.findOneAndUpdate({ _id: id }, { name, schoolId });
    res.redirect(routes.home);
  } catch (error) {
    res.status(400);
    res.redirect(routes.userDetail(id));
  }
};
export const getWriteNotice = (req, res) => {
  const {
    params: { id },
  } = req;
  res.render("writeNotice", { pageTitle: "writeNotice", id });
};
export const postWriteNotice = async (req, res) => {
  const {
    body: { title, content },
    params: { id },
  } = req;

  try {
    const newNotice = await Notice.create({
      creator: req.user.id,
      title,
      content,
    });

    const lecture = await Lecture.findById(id);
    lecture.notices.push(newNotice.id);
    lecture.save();

    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.writeNotice(id));
  }
};

export const getMakeLecture = (req, res) => {
  res.render("makeLecture", { pageTitle: "makeLecture", id: req.user.id });
};

export const postMakeLecture = async (req, res) => {
  const {
    body: { lectureId, name },
    user,
  } = req;

  try {
    const newLecture = await Lecture.create({
      lectureId,
      name,
      professor: user.id,
    });

    const prof = await User.findById(user.id);
    prof.lectures.push(newLecture);
    prof.save();
    res.redirect(routes.home);
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const getSeeLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate({
      path: "professor",
      select: "name",
    });
    res.render("seeLectures", { pageTitle: "seeLectuers", lectures });
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const postSeeLectures = (req, res) => {};

export const newNotices = async (req, res) => {
  const {
    params: { id }, // 유저 id
  } = req;
  moment.tz.setDefault("Asia/Seoul");
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const user = await User.findById(id).populate({
    path: "lectures",
    populate: {
      path: "notices",
      populate: {
        path: "creator",
        select: "name",
      },
      select: "createdAt title content",
    },
  });

  let filteredNotices = [[]];
  user.lectures.forEach((lecture, index) => {
    filteredNotices[index] = lecture.notices.filter((notice) => {
      const splitedNotice = JSON.stringify(notice.createdAt)
        .split("T")[0]
        .split("-");
      const uploadedYear = splitedNotice[0];
      const uploadedMon = splitedNotice[1];
      const uploadedDay = splitedNotice[2];

      const splitedNow = JSON.stringify(now).split(" ")[0].split("-");
      const nowMon = splitedNow[1];
      const nowDay = splitedNow[2];
      const nowYear = splitedNow[0];

      if (nowMon === uploadedMon && nowYear === uploadedYear) {
        if (parseInt(nowDay) - parseInt(uploadedDay) <= 3) {
          return notice;
        }
      }
    });
  });
  console.log(filteredNotices);
  res.render("newNotices", { pageTitle: "newNotices", filteredNotices });
};
