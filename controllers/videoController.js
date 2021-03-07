import routes from '../routes';
import Video from '../models/Video';
import User from '../models/User';

export const home = async (req, res) => {
  // catch가 없으면 에러가 났을 때, JS는 아무 동작을 해주지 않는다.
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
    // console.log(videos);
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const search = async (req, res) => {
  // const {query} = req; => req.query와 같다.
  // const SearchingBy = req.query.term; => es6 이전의 코딩 방식
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

// export const videos = (req, res) => res.render("videos", {pageTitle: "Videos"})
export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const postUpload = async (req, res) => {
  const {
    file: { path },
    body: { title, description },
  } = req;
  // console.log(path, title, description);
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user._id,
  });
  const user = await User.findById(req.user._id);
  user.videos.push(newVideo.id);
  await user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  // console.log(req.params);
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    // console.log(typeof video.creator.id);
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    // console.log(error)
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // console.log(typeof (video.creator, req.user._id));
    if (String(video.creator) !== req.user._id) {
      throw Error();
    } else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    // console.log(Video.findById(id));
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // console.log(typeof (video.creator, req.user._id));
    if (String(video.creator) !== req.user._id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {}
  res.redirect(routes.home);
};
