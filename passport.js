import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import User from './models/User';
import { facebookLoginCallback, githubLoginCallback } from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_C_ID,
      clientSecret: process.env.GH_C_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback,
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_C_ID,
      clientSecret: process.env.FB_C_SECRET,
      callbackURL: `https://cb99f66b578b.ngrok.io${routes.facebookCallback}`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email'],
    },
    facebookLoginCallback,
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
