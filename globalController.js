export const home = (req, res) => {
  res.render("home", { pageTitle: "home" });
};
export const join = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const login = (req, res) => {
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
