import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  public static async getInProgressMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const inProgressMatches = await MatchesService
        .getInProgressMatches();
      return res.status(200).json(inProgressMatches);
    }
    const inProgressMatches = await MatchesService.getInProgressMatches(inProgress === 'true');
    return res.status(200).json(inProgressMatches);
  }
}
