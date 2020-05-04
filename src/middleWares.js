import routes from "./routes";

export const localMiddle = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.loggedUser = req.user;
  next();
};
