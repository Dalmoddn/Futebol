import * as express from 'express';
import 'express-async-errors';
import TeamsController from './database/controllers/Teams.Controller';
import LoginController from './database/controllers/Login.Controller';
import ValidateMiddleware from './middlewares/ValidateMiddleware';

import errorMiddleware from './middlewares/errorMiddleware';
import MatchesController from './database/controllers/Matches.Controller';
import LeaderboardController from './database/controllers/Leaderboard.Controller';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', TeamsController.getAllTeams);
    this.app.get('/teams/:id', TeamsController.getTeamById);
    this.app.post('/login', LoginController.loginUser);
    this.app.get('/login/role', ValidateMiddleware.validateToken, LoginController.userRole);
    this.app.get('/matches', MatchesController.getInProgressMatches);
    this.app.patch('/matches/:id/finish', ValidateMiddleware
      .validateToken, MatchesController.finishMatch);
    this.app.patch('/matches/:id', ValidateMiddleware.validateToken, MatchesController.updateMatch);
    this.app.post('/matches', ValidateMiddleware
      .validateToken, MatchesController.addInProgressMatch);
    this.app.get('/leaderboard/home', LeaderboardController.createBoard);

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
