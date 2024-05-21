import Teams from '../models/Teams.Model';
import TeamsInterface from '../../Interfaces/Teams.Interface';

export default class TeamsService {
  public static async getAllTeams(): Promise<TeamsInterface[]> {
    return Teams.findAll();
  }

  public static async getTeamById(id: number): Promise<TeamsInterface | null> {
    return Teams.findByPk(id);
  }
}
