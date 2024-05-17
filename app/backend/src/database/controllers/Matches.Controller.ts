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

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await MatchesService.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Match updated' });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
