export const environment = {
  production: true,
  apiUrl: 'https://financeiro-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('ipontosis.com.br') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
