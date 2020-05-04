import express from "express";
import routes from "./routes";
import { getEnrollLecture, postEnrollLecture } from "./apiController";

export const apiRouter = express.Router();

apiRouter.get(routes.enrollLecture(), getEnrollLecture);
apiRouter.post(routes.enrollLecture(), postEnrollLecture);
