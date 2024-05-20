import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.Service';

export default class LeaderboardController {
  public static async createBoard(_req: Request, res: Response): Promise<any> {
    const board = await LeaderboardService.createBoard();
    res.status(200).json(board);
  }
}
