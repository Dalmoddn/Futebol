import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import LoginService from '../services/Login.Service';

const JWT_SECRET = 'jwt_secret';

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginResponse = await LoginService.loginUser(email, password);
  if (loginResponse.status === 200) {
    res.status(loginResponse.status).json({
      token: loginResponse.token,
    });
  } else {
    res.status(loginResponse.status).json({
      message: loginResponse.message,
    });
  }
};

const userRole = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const authToken = authorization.split(' ')[1];
  try {
    const username = jwt.verify(authToken, JWT_SECRET) as { username: string };
    const role = await LoginService.userRole(username.username);
    if (!role) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  loginUser,
  userRole,
};
