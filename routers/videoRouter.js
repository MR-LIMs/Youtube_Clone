import express from 'express';
import { deleteVideo, getEditVideo, postEditVideo, getUpload, postUpload, videoDetail } from '../controllers/videoController';
import routes from '../routes';
import { onlyPrivate, uploadVideo } from '../middlewares';

const videoRouter = express.Router();

// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
// 이 파일엔 videoRouter 하나의 개체만 있으므로, default 사용
