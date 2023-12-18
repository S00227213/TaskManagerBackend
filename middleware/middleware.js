
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    // Enable caching and rate limiting for JWKs requests
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,

    jwksUri: 'https://dev-ndywccr6mmps6jzp.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://myapi.example.com', 
  issuer: 'https://dev-ndywccr6mmps6jzp.us.auth0.com/',
  algorithms: ['RS256']
});

// Export the JWT authentication middleware
module.exports = checkJwt;
