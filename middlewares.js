import routes from './routes';
import multer from 'multer';

const multerVideo = multer({ dest: 'uploads/videos/' }); // destination : server에 있는 videos폴더
const multerAvatar = multer({ dest: 'uploads/avatars/' }); // destination : server에 있는 videos폴더

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // console.log(req.user, req.body);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');
