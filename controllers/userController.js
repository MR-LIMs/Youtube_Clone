import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
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

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
  // User.findOrCreate({ githubId: profile.id }, (err, user) => {
  //   cb(err, user);
  // });
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
