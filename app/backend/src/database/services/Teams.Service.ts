import Teams from '../models/Teams.Model';
import TeamsInterface from '../../Interfaces/Teams.Interface';

export default class TeamsService {
  public static async getAllTeams(): Promise<TeamsInterface[]> {
    return Teams.findAll();
  }

  public static async getTeamById(id: number): Promise<TeamsInterface | null> {
    return Teams.findByPk(id);
  }

  public static async createTeam(team: TeamsInterface): Promise<TeamsInterface> {
    return Teams.create(team);
  }

  public static async updateTeam(id: number, team: TeamsInterface): Promise<TeamsInterface | null> {
    const foundTeam = await Teams.findByPk(id);
    if (foundTeam) {
      await foundTeam.update(team);
      return foundTeam;
    }
    return null;
  }

  public static async deleteTeam(id: number): Promise<number> {
    return Teams.destroy({ where: { id } });
  }
}
