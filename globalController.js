import passport from "passport";
import routes from "./routes";
import User from "./models/User";
import Lecture from "./models/Lecture";
import Notice from "./models/Notice";

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
export const lectureDetail = async (req, res) => {
  const { query: id } = req;
  try {
    const lecture = await Lecture.findById(id);
    //const lecture = await Lecture.findById(id).populate("notices");
    res.render("lectureDetail", { pageTitle: "lectureDetail", lecture });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "userDetail" });
};
export const getWriteNotice = (req, res) => {
  const { query: id } = req;
  res.render("writeNotice", { pageTitle: "writeNotice", id });
};
export const postWriteNotice = async (req, res) => {
  const { body: title, content, query: id } = req;

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
