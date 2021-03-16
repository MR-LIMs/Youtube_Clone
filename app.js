// const express = require('express');
// 패키지에서 express를 찾고 node_modules로 넘어가 찾는다.
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import { localsMiddleware } from './middlewares';

import routes from './routes';
import apiRouter from './routers/apiRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

import './passport';

const app = express();

const CookieStore = connectMongo(session);

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://archive.org");
  next();
});

app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.api, apiRouter);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // user로 접속하면 userRouter를 모두 사용하겠다.
app.use(routes.videos, videoRouter);

export default app; // app objects를 외부에 주겠다.
