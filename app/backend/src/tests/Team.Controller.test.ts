import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request } from 'express';
import TeamsService from '../database/services/Teams.Service';
import TeamsController from '../database/controllers/Teams.Controller';
import { getAllTeamsMockReturn, findTeamByIdMockReturn } from './Mocks';


describe('TEAMS CONTROLLER', () => {
  describe('Tests the getAllTeams function', () => {
    it('Should return 2 teams', async () => {
      const req = {} as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const getAllTeamsStub: sinon.SinonStub = sinon.stub(TeamsService, 'getAllTeams').resolves(getAllTeamsMockReturn);

      await TeamsController.getAllTeams(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getAllTeamsMockReturn)).to.be.true;

      getAllTeamsStub.restore();
    });
  });

  describe('Tests the findTeamById function', () => {
    it('Should return a single team with the given id', async () => {
      const req = {
        params: { id: 1 },
      } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const findTeamByIdStub: sinon.SinonStub = sinon.stub(TeamsService, 'getTeamById').resolves(findTeamByIdMockReturn);

      await TeamsController.getTeamById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(findTeamByIdMockReturn)).to.be.true;

      findTeamByIdStub.restore();
    });

    it('Should return 404 if an id is not found', async () => {
      const req = {
        params: { id: 999 },
      } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const getTeamByIdStub: sinon.SinonStub = sinon.stub(TeamsService, 'getTeamById').resolves(null);

      await TeamsController.getTeamById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Team not found' })).to.be.true;

      getTeamByIdStub.restore();
    });
  });
});