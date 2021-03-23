const jwksClient = require('jwks-rsa');

const jwksClientCache = {};

function normalizeIssuer(issuer) {
  return issuer ? issuer.replace(/\/$/, '') : issuer;
}

function lazyJwksClient(jwksUri) {
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

async function getSigningKey(decoded) {
  const { header: { kid }, payload: { iss } } = decoded;
  const issuer = normalizeIssuer(iss);
  const jwksUri = `${issuer}/.well-known/jwks.json`;
  const client = lazyJwksClient(jwksUri);
  const key = await client.getSigningKey(kid);
  return key.publicKey || key.rsaPublicKey;
}

module.exports = { getSigningKey };
