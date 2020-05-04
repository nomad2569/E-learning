import express from "express";
import babelPolyFill from "@babel/polyfill";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import routes from "./routes";
import { globalRouter } from "./globalRouter";
import { apiRouter } from "./apiRouter";
import { localMiddle } from "./middleWares";
import "./db";
import passport from "passport";
import session from "express-session";
import "./passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 1000;

const CokieStore = MongoStore(session);

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(helmet()); // 보안 담당
app.use(cookieParser()); //서버가 쿠키를 이해하도록 한다
app.use(bodyParser.json()); // 서버가 json을 이해
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 html문서를 이해
app.use(morgan("dev"));

app.use(localMiddle);

app.use(routes.home, globalRouter);
app.use(routes.api, apiRouter);
