import bcrypt from 'bcrypt';
import { User } from '../models/User';


export const checkUserExistence  = async(u: string) => {
  const userName = await User.findOne({userName: u});

  if(!userName) return false;

  return userName;
}

export const confirmedPassword = async (p: string, c: string) => {
    if(p !== c) return false;
    return true
}

export const hashPassword = async (p: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(p, salt);

    return hash;
  }
