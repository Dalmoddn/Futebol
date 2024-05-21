import { expect } from 'chai';
import * as sinon from 'sinon';
import MatchesService from '../database/services/Matches.service';
import MatchesController from '../database/controllers/Matches.Controller';

describe('MATCHES CONTROLLER', () => {
  describe('Tests the getInProgressMatches function', () => {
  });

  describe('Tests the finishMatch function', () => {
    it('Should finish the match and return a success message', async () => {
      const finishMatchStub: any = sinon.stub(MatchesService, 'finishMatch');
      const req = { params: { id: '1' } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.finishMatch(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Finished' })).to.be.true;
      finishMatchStub.restore();
    });

    it('Should return an error message if finishMatch throws an error', async () => {
      const finishMatchStub: any = sinon.stub(MatchesService, 'finishMatch').throws(new Error('Invalid token'));
      const req = { params: { id: '1' } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.finishMatch(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
      finishMatchStub.restore();
    });
  });

  describe('Tests the updateMatch function', () => {
    it('Should update the match and return a success message', async () => {
      const updateMatchStub: any = sinon.stub(MatchesService, 'updateMatch');
      const req = { params: { id: '1' }, body: { homeTeamGoals: 2, awayTeamGoals: 1 } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.updateMatch(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Match updated' })).to.be.true;
      updateMatchStub.restore();
    });

    it('Should return an error message if updateMatch throws an error', async () => {
      const updateMatchStub: any = sinon.stub(MatchesService, 'updateMatch').throws(new Error('Invalid token'));
      const req = { params: { id: '1' }, body: { homeTeamGoals: 2, awayTeamGoals: 1 } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.updateMatch(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
      updateMatchStub.restore();
    });
  });

  describe('Tests the addInProgressMatch function', () => {
    it('Should add an in progress match and return the match', async () => {
      const addInProgressMatchStub: any = sinon.stub(MatchesService, 'addInProgressMatch').resolves({ status: 201, message: '', match: { id: 1, homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 } });
      const req = { body: { homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.addInProgressMatch(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1, homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 })).to.be.true;
      addInProgressMatchStub.restore();
    });

    it('Should return an error message if addInProgressMatch throws an error', async () => {
      const addInProgressMatchStub: any = sinon.stub(MatchesService, 'addInProgressMatch').throws(new Error('There is no team with such id!'));
      const req = { body: { homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 } } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await MatchesController.addInProgressMatch(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'There is no team with such id!' })).to.be.true;
      addInProgressMatchStub.restore();
    });
  });
});