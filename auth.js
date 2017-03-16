const uuid = require('node-uuid');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');

let auth = function () {
};

auth.prototype.facebook = (app, config) => {

  let passport = require('passport');
  app.use(session({secret: uuid.v4(), resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/auth/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/callback', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
  });
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  passport.use(new FacebookStrategy({
      callbackURL: config.callbackURL,
      clientID: config.clientID,
      clientSecret: config.clientSecret
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, {accessToken: accessToken, profile: profile});
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, {accessToken: user.accessToken, profile: user.profile});
  });

  let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/auth/login');
  };

  return {passport: passport, ensureAuthenticated: ensureAuthenticated};
};

module.exports = new auth();
