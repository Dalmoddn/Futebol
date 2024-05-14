import { Request, Response } from 'express';
import TeamsService from '../services/Teams.Service';

export default class TeamsController {
  public static async getAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await TeamsService.getAllTeams();
    res.status(200).json(teams);
  }

  public static async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamsService.getTeamById(Number(id));
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  }
}
