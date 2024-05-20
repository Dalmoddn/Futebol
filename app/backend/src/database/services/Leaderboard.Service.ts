import Teams from '../models/Teams.Model';
import Matches from '../models/Matches.Model';

export default class LeaderboardService {
  public static calculatePoints(homeTeamGoals:
  number, awayTeamGoals: number): number {
    if (homeTeamGoals > awayTeamGoals) {
      return 3;
    } if (homeTeamGoals === awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  public static teamVictories(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals > awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  public static teamDraws(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals === awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  public static teamLosses(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals < awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  public static goalsFavor(homeTeamGoals: number, _awayTeamGoals: number): number {
    return homeTeamGoals;
  }

  public static goalsAgainst(_homeTeamGoals: number, awayTeamGoals: number): number {
    return awayTeamGoals;
  }

  public static totalGames(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals === awayTeamGoals || homeTeamGoals > awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  public static async createBoard(): Promise<any> {
    const allTeams = await Teams.findAll();
    const allMatches = await Matches.findAll({ where: { inProgress: false } });
    const matches = allMatches.map((match) => {
      const homeTeam = allTeams.find((team) => team.id === match.homeTeamId);
      return {
        name: homeTeam?.teamName,
        totalPoints: this.calculatePoints(match.homeTeamGoals, match.awayTeamGoals),
        totalGames: this.totalGames(match.homeTeamGoals, match.awayTeamGoals),
        totalVictories: this.teamVictories(match.homeTeamGoals, match.awayTeamGoals),
        totalDraws: this.teamDraws(match.homeTeamGoals, match.awayTeamGoals),
        totalLosses: this.teamLosses(match.homeTeamGoals, match.awayTeamGoals),
        goalsFavor: this.goalsFavor(match.homeTeamGoals, match.awayTeamGoals),
        goalsOwn: this.goalsAgainst(match.homeTeamGoals, match.awayTeamGoals),
      };
    });
    return matches;
  }
}
