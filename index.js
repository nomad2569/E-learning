import express from "express";
import path from "path";

const app = express();
const PORT = 1000;

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet()); // 보안 담당
app.use(cookieParser()); //서버가 쿠키를 이해하도록 한다
app.use(bodyParser.json()); // 서버가 json을 이해
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 html문서를 이해
app.use(morgan("dev"));
