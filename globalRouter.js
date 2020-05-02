import express from "express";
import routes from "./routes";
import { home } from "./globalController";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
