import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import { expect } from 'chai';
import * as bcyrpt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import UsersModel from '../database/models/Users.Model';
import { authValidMockReturn, roleMockReturn } from './Mocks';

import { app } from '../app';
import LoginService from '../database/services/Login.Service';
chai.use(chaiHttp);

const BAD_EMAIL = '@DotA.com';
const VOID_EMAIL = '';
const VOID_PASSWORD = '';
const GOOD_EMAIL = 'silencer@dota.com';
const GOOD_PASSWORD = 'secret_user';
const INVALID_EMAIL_PASSWORD_MESSAGE = 'Invalid email or password';
const ALL_FIELDS_MUST_BE_FILLED_MESSAGE = 'All fields must be filled';
const MOCK_VALID_BODY = { email: GOOD_EMAIL, password: GOOD_PASSWORD };
const MOCK_BAD_BODY = { email: BAD_EMAIL, password: GOOD_PASSWORD };
const MOCK_VOID_EMAIL_BODY = { email: VOID_EMAIL, password: GOOD_PASSWORD };
const MOCK_VOID_PASSWORD_BODY = { email: GOOD_EMAIL, password: VOID_PASSWORD };

describe('LOGIN SERVICE', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Tests the userLogin function', () => {
    it('Should return status 400 and error message if email is missing', async () => {
      const result = await chai.request(app).post('/login').send(MOCK_VOID_EMAIL_BODY);
      expect(result.body).to.deep.equal({ message: ALL_FIELDS_MUST_BE_FILLED_MESSAGE });
      expect(result.status).to.equal(400);
    });

    it('Should return status 400 and error message if password is missing', async () => {
      const result = await chai.request(app).post('/login').send(MOCK_VOID_PASSWORD_BODY);
      expect(result.body).to.deep.equal({ message: ALL_FIELDS_MUST_BE_FILLED_MESSAGE });
      expect(result.status).to.equal(400);
    });

    it('Should return status 401 and error message if email is not found', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(null);
      const result = await chai.request(app).post('/login').send(MOCK_BAD_BODY);
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });
    });

    it('Should return status 200 and a token if login is successful', async () => {
      sinon.stub(jwt, 'sign').returns();
      sinon.stub(UsersModel, 'findOne').resolves(UsersModel.build(authValidMockReturn));

      const result = await chai.request(app).post('/login').send(MOCK_VALID_BODY);
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal({});
    });

    it('Should return status 401 and error message if email is invalid', async () => {
      const result = await chai.request(app).post('/login').send({ email: 'invalid_email', password: GOOD_PASSWORD });
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });
      expect(result.status).to.equal(401);
    });
  
    it('Should return status 401 and error message if email is not found', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(null);
      const result = await chai.request(app).post('/login').send({ email: 'unexistent_email', password: GOOD_PASSWORD });
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });
    });
  
    it('Should return status 401 and error message if password is incorrect', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(UsersModel.build(authValidMockReturn));
      const result = await chai.request(app).post('/login').send({ email: GOOD_EMAIL, password: 'incorrect_password' });
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });
    });
  
    it('Should return status 401 and error message if password is less than 6 characters', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(UsersModel.build(authValidMockReturn));
      const result = await chai.request(app).post('/login').send({ email: GOOD_EMAIL, password: '12345' });
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });
    });

  });
  describe('Tests the getUserRole function', () => {
    it('Should return no role', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(null);
      const getUserRole = await LoginService.userRole('user');
      expect(getUserRole).to.equal(null);
    });

    it('Should return the user role', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(roleMockReturn as any);
      const getUserRole = await LoginService.userRole('user');
      expect(getUserRole).to.equal('role');
    });
  });
});