import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send('video index'));
videoRouter.get(routes.upload, (req, res) => res.send('video edit'));
videoRouter.get(routes.videoDetail, (req, res) => res.send('video password'));
videoRouter.get(routes.editVideo, (req, res) => res.send('video password'));
videoRouter.get(routes.deleteVideo, (req, res) => res.send('video password'));

export default videoRouter; 
// 이 파일엔 videoRouter 하나의 개체만 있으므로, default 사용