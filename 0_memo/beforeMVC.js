// const express = require('express');  
// 패키지에서 express를 찾고 node_modules로 넘어가 찾는다.
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { userRouter } from "./router"

const app = express();
const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
}

const handelHome = (req, res) => res.send('hello from home!');
  // 서버가 동작하는 데에 있어서 요청과 응답이 동시에 존재해야 한다.
  // console.log(req)
const handleProfile = (req, res) => res.send('You are on my profile');

const betweenHome = (req, res, next) => {
  console.log('Between');
  next();
}

app.use(helmet());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"))
app.use(betweenHome);

app.get("/", handelHome);
app.get("/profile", handleProfile);

app.use("/user", userRouter)  // user로 접속하면 userRouter를 모두 사용하겠다.

app.listen(PORT, handleListening);

export default app; // app objects를 외부에 주겠다.