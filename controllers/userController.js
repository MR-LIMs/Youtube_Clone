import passport from 'passport';
import routes from '../routes';
import User from '../models/User';
import Video from '../models/Video';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res, next) => {
  // console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400); // status code
    res.render('join', { pageTitle: 'Join' });
  } else {
    // To Do: Register User
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log User Id
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  // console.log(profile);
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, cb) => {
  // console.log(profile);
  const {
    _json: { name, id, email },
    photos: [{ value: avatarUrl }],
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        avatarUrl,
        facebookId: id,
        email,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

// 인증 성공 후 home으로 redirect 해주기
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user._id);
  res.render('userDetail', { pageTitle: 'User Detail', user });
};

export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate('videos');
    console.log(user);
    const videos = user.videos;
    // id : string,
    // req.user._id : string,
    // user.id : string,
    // user._id : object,
    // req.user.id : undefined,

    // user.id === req.user._id를 써야 한다!!!!!!!!
    // console.log(user._id, req.user._id, user.id, req.user.id);
    res.render('userDetail', { pageTitle: 'User Detail', user, videos });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  console.log(req.user, user);
  if (req.user._id === user.id) {
    res.render('editProfile', { pageTitle: 'Edit Profile', user });
  } else {
    res.redirect(routes.home);
  }
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile(req.user._id));
  }
};

export const getChangePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'Change Password' });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { currentPassword, newPassword, verifyNewPassword },
  } = req;
  try {
    if (newPassword !== verifyNewPassword) {
      res.status(400);
      res.redirect(routes.changePassword(req.user._id));
      console.log('Verify again');
    } else {
      const user = await User.findById(req.user._id);
      await user.changePassword(currentPassword, newPassword);
      res.redirect(routes.me);
      console.log('success');
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.changePassword(req.user._id));
    console.log('Error now');
  }
};
