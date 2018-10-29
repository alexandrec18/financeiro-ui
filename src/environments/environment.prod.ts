export const environment = {
  production: true,
  apiUrl: 'https://financeiro-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('financeiro-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
