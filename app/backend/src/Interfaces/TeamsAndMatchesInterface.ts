export default interface TeamsAndMatchesInterface {
  id: number,
  homeTeamId: number | undefined,
  homeTeamGoals: number,
  awayTeamId: number | undefined,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string | undefined,
  }
  awayTeam: {
    teamName: string | undefined,
  }
}
