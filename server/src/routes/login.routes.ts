import express, { Request, Response } from 'express';
import { loginView, registerUser, registerView } from '../controllers/login.controller';
import passport from 'passport';
import { checkNotAuthenticated } from '../middleware/auth.middleware';

const userRoutes = (app: express.Application) => {
  app.get('/register', checkNotAuthenticated, registerView);
  app.post('/register', checkNotAuthenticated, registerUser);

  app.get('/login', checkNotAuthenticated, loginView);
  app.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }),
  );
  app.delete('/logout', (req: Request, res: Response, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    req.flash('success_msg', 'session terminated');
    res.redirect('/login');
  });
};

export default userRoutes;
