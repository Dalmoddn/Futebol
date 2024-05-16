import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../models/Users.Model';

const INVALID_EMAIL_PASSWORD_MESSAGE = 'Invalid email or password';

const JWT_SECRET = 'jwt_secret';
const userToken = (username: string) => jwt.sign(
  { username },
  JWT_SECRET as string,
  { expiresIn: '24h' },
);

const checkEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const findUserbyEmail = async (email: string) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

const userRole = async (username: string) => {
  const validUser = await Users.findOne({ where: { username } });
  if (!validUser) {
    return null;
  }
  return validUser.role;
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    return { status: 400, message: 'All fields must be filled' };
  }
  if (!checkEmail(email)) {
    return { status: 401, message: INVALID_EMAIL_PASSWORD_MESSAGE };
  }
  const user = await findUserbyEmail(email);

  if (user) {
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword || password.length < 6) {
      return { status: 401, message: INVALID_EMAIL_PASSWORD_MESSAGE };
    }
    const token = userToken(user.username);
    return { status: 200, token };
  }
  return { status: 401, message: INVALID_EMAIL_PASSWORD_MESSAGE };
};

export default {
  loginUser,
  userToken,
  userRole,
};
