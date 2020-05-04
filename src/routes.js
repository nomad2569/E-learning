const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CHANGE_PASSWORD = "/change-password";
const LECTURE_DETAIL = "/lecture/:id";
const WRITE_NOTICE = "/write-notice/:id";
const USER_DETAIL = "/:id";
const NEW_NOTICES = "/:id/new-notices";

const MAKE_LECTURE = "/:id/make-lecture";
const SEE_LECTURES = "/see-lectures";

//API

const API = "/api";
const ENROLL_LECTURE = "/enroll/:id";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  changePassword: CHANGE_PASSWORD,
  lectureDetail: (id) => {
    if (id) return `/lecture/${id}`;
    else return LECTURE_DETAIL;
  },
  writeNotice: (id) => {
    if (id) return `/write-notice/${id}`;
    else return WRITE_NOTICE;
  },
  userDetail: (id) => {
    if (id) return `/${id}`;
    else return USER_DETAIL;
  },
  newNotices: (id) => {
    if (id) return `/${id}/new-notices`;
    else return NEW_NOTICES;
  },
  makeLecture: (id) => {
    if (id) return `/${id}/make-lecture`;
    else return MAKE_LECTURE;
  },
  seeLectures: SEE_LECTURES,
  api: API,
  enrollLecture: (id) => {
    if (id) return `/enroll/${id}`;
    else return ENROLL_LECTURE;
  },
};

export default routes;
