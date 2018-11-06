export const environment = {
  production: true,
  apiUrl: 'https://financeiro-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('financeiro-api.herokuapp.com'),
                             new RegExp('ipontosis.com.br')  ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
