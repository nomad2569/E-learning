import routes from "./routes";
import User from "./models/User";
import Lecture from "./models/Lecture";
import Notice from "./models/Notice";

export const getEnrollLecture = async (req, res) => {
  const {
    params: { id },
  } = req;
  res.render("enrollLecture", { id });
};
export const postEnrollLecture = async (req, res) => {
  const {
    params: { id }, //강의 ID
  } = req;

  try {
    const lectureToAdd = await Lecture.findById(id);
    const user = await User.findById(req.user.id);

    user.lectures.push(lectureToAdd);
    user.save();
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};
