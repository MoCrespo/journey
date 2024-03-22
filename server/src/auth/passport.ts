import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserById, verifyPassword } from '../services/login.service';

export const authenticateUser = async (username: string, password: string, done) => {
  try {
    const isValid = await verifyPassword(username, password);

    if (isValid) {
      return done(null, username);
    } else {
      return done(null, false, { message: 'Invalid username or password' });
    }
  } catch (error) {
    return done(error);
  }
};

export const initialize = (passport: PassportStatic) => {
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (username: string, done) => {
    try {
      const user = await getUserById(username);
      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'));
      }
    } catch (error) {
      done(error);
    }
  });
};
