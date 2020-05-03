import routes from "./routes";

export const localMiddle = (req, res, next) => {
  res.locals.routes = routes;
  next();
};
