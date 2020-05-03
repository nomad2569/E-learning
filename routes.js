const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const LECTURE_DETAIL = "/lecture/:id";
const WRITE_NOTICE = "/:id/write-notice";
const USER_DETAIL = "/:id";
const NEW_NOTICES = "/:id/new-notices";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  lectureDetail: (id) => {
    if (id) return `/lecture/${id}`;
    else return LECTURE_DETAIL;
  },
  writeNotice: (id) => {
    if (id) return `/${id}/write-notice`;
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
};

export default routes;
