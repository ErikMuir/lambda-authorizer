const jwksClient = require('jwks-rsa');

const jwksClientCache = {};

function lazyJwksClient(issuer) {
  const normalizedIssuer = issuer.replace(/\/$/, '');
  const jwksUri = `${normalizedIssuer}/.well-known/jwks.json`;
  if (!jwksClientCache[jwksUri]) {
    jwksClientCache[jwksUri] = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
      jwksUri,
    });
  }
  return jwksClientCache[jwksUri];
};

module.exports = {
  lazyJwksClient,
  jwksClientCache,
};
