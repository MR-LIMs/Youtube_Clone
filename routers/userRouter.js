import express from "express";
import routes from "../routes";

const userRouter = express.Router(); 

userRouter.get(routes.users, (req, res) => res.send('user index'));
userRouter.get(routes.userDetail, (req, res) => res.send('user edit'));
userRouter.get(routes.editProfile, (req, res) => res.send('user password'));
userRouter.get(routes.changePassword, (req, res) => res.send('user password'));

export default userRouter;