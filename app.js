// const express = require('express');  
// 패키지에서 express를 찾고 node_modules로 넘어가 찾는다.
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);  // user로 접속하면 userRouter를 모두 사용하겠다.
app.use(routes.videos, videoRouter);

export default app; // app objects를 외부에 주겠다.