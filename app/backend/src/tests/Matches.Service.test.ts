import * as sinon from 'sinon';
import { expect } from 'chai';
import MatchesModel from '../database/models/Matches.Model';
import TeamsModel from '../database/models/Teams.Model';
import MatchesService from '../database/services/Matches.service'
import { getAllMatchesMockReturn, getAllTeamsMockReturn, matchesAndTeamsMockReturn } from './Mocks';

describe('MATCHES SERVICE', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.restore();
  });
  describe('Tests the getMatchesAndTeams function', () => {
    it('Should return all matches and teams', async () => {
      const matches: any = getAllMatchesMockReturn;
      const teams: any = getAllTeamsMockReturn;

      sinon.stub(MatchesModel, 'findAll').resolves(matches);
      sinon.stub(TeamsModel, 'findAll').resolves(teams);

      const matchesAndTeams = await MatchesService.getTeamsAndMatches();
      expect(matchesAndTeams).to.have.lengthOf(1);
      expect(matchesAndTeams).to.be.deep.equal(matchesAndTeamsMockReturn);
    });
  });
});