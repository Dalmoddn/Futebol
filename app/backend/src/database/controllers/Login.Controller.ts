import { Request, Response } from 'express';
import LoginService from '../services/Login.Service';

export default class LoginController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await LoginService.(email, password);
    res.json({ token });
  }
}