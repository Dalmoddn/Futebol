import TeamsModel from '../../src/database/models/Teams.Model';
import TeamsService from '../../src/database/services/Teams.Service';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { getAllTeamsMockReturn, findTeamByIdMockReturn } from './Mocks';

describe('TEAMS SERVICES', () => {
  describe('Tests the getAllTeams function', () => {
    it('Should return 2 teams', async () => {
      const geatAllTeamsStub: any = sinon.stub(TeamsModel, 'findAll').resolves(getAllTeamsMockReturn as unknown as any);
      const result = await TeamsService.getAllTeams();
      expect(result).to.deep.equal(getAllTeamsMockReturn);
      geatAllTeamsStub.restore();
    });
  });

  describe('Tests the findTeamById function', () => {
    it('Should return a single team with the given id', async () => {
      const teamId = 1;
      const findByOneStub: any = sinon.stub(TeamsModel, 'findOne').resolves(findTeamByIdMockReturn as unknown as any);
      const result = await TeamsService.getTeamById(teamId);
      expect(result).to.deep.equal(findTeamByIdMockReturn);
      findByOneStub.restore();
    });

    it('Should return null if an id is not found', async () => {
      const teamId = 999;
      const findByPkStub: any = sinon.stub(TeamsModel, 'findByPk').resolves(null);
      const result = await TeamsService.getTeamById(teamId);
      expect(result).to.be.null;
      findByPkStub.restore();
    });
  });
});