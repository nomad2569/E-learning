import passport from "passport";
import routes from "./routes";
import User from "./models/User";

export const home = (req, res) => {
  res.render("home", { pageTitle: "home" });
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = async (req, res) => {
  const {
    body: { accessor, schoolId, name, email, password, password2 },
  } = req;
  console.log(accessor);
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      if (accessor == 1) {
        const newUser = await User({
          isStudent: true,
          schoolId,
          email,
          name,
        });
        await User.register(newUser, password);
        console.log("join 성공@@");
      } else if (accessor == 2) {
        const newUser = await User({
          isProf: true,
          schoolId,
          email,
          name,
        });
        await User.register(newUser, password);
        console.log("join 성공@@");
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
export const postLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};
export const lectureDetail = (req, res) => {
  res.render("lectureDetail", { pageTitle: "lectureDetail" });
};
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "userDetail" });
};
export const writeNotice = (req, res) => {
  res.render("writeNotice", { pageTitle: "writeNotice" });
};
