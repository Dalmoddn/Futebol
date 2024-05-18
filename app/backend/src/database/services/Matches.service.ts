import TeamsAndMatchesInterface from '../../Interfaces/TeamsAndMatchesInterface';
import Teams from '../models/Teams.Model';
import TeamsInterface from '../../Interfaces/Teams.Interface';
import Matches from '../models/Matches.Model';
import MatchesInterface from '../../Interfaces/Matches.Interface';

export default class MatchesService {
  public static async getAllTeams(): Promise<TeamsInterface[]> {
    return Teams.findAll();
  }

  public static async getAllMatches(): Promise<MatchesInterface[]> {
    return Matches.findAll();
  }

  public static async getTeamsAndMatches(): Promise<TeamsAndMatchesInterface[]> {
    const matches = await this.getAllMatches();
    const teams = await this.getAllTeams();
    const teamsAndMatches = matches.map((match) => {
      const homeTeam = teams.find((team) => team.id === match.homeTeamId);
      const awayTeam = teams.find((team) => team.id === match.awayTeamId);
      return {
        id: match.id,
        homeTeamId: homeTeam?.id,
        homeTeamGoals: match.homeTeamGoals,
        awayTeamId: awayTeam?.id,
        awayTeamGoals: match.awayTeamGoals,
        inProgress: match.inProgress,
        homeTeam: { teamName: homeTeam?.teamName },
        awayTeam: { teamName: awayTeam?.teamName },
      };
    });
    return teamsAndMatches;
  }

  public static async getInProgressMatches(status?: boolean): Promise<any[]> {
    let inProgress;
    if (status === true || status === false) {
      const teamsAndMatches = await this.getTeamsAndMatches();
      inProgress = teamsAndMatches.filter((match) => match.inProgress === status);
    } else {
      inProgress = await this.getTeamsAndMatches();
    }
    return inProgress;
  }

  public static async finishMatch(matchId: number): Promise<void> {
    await Matches.update({ inProgress: false }, { where: { id: matchId } });
  }

  public static async updateMatch(matchId: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<void> {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id: matchId } });
  }

  public static async verifyTeamsExistence(homeTeamId:
  number, awayTeamId: number): Promise<any> {
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const homeTeam = await Teams.findOne({ where: { id: homeTeamId } });
    const awayTeam = await Teams.findOne({ where: { id: awayTeamId } });
    if (!homeTeam || !awayTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    return { status: 201 };
  }

  public static async addInProgressMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<any> {
    const { status, message } = await this.verifyTeamsExistence(homeTeamId, awayTeamId);
    const id = (await Matches.findAll()).length + 1;
    const match = await Matches.create({
      id,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (status !== 201) return { status, message };
    return { status: 201, match };
  }
}
