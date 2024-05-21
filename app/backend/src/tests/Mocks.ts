export const getAllTeamsMockReturn = [
  {
    id: 1,
    teamName: 'Sven Futebol Clube',
  },
  {
    id: 2,
    teamName: 'Sand King Futebol Clube',
  },
];

export const findTeamByIdMockReturn = {
  id: 1,
  teamName: 'Sven Futebol Clube',
};

export const authValidMockReturn = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

export const roleMockReturn = {
  username: 'user',
  role: 'role'
}

export const getAllMatchesMockReturn = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { teamName: 'Team 1' },
    awayTeam: { teamName: 'Team 2' },
  }
]

export const matchesAndTeamsMockReturn = [
  {
    id: 1,
    homeTeamId: undefined,
    homeTeamGoals: 1,
    awayTeamId: undefined,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: undefined
    },
    awayTeam: {
      teamName: undefined
    }
  },
]

export const getAllMatchesAndTeamsMockReturn = [

  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]