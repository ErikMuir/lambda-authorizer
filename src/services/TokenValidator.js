const { LambdaLogger } = require('@erikmuir/lambda-utils');
const jwt = require('jsonwebtoken');
const env = require('../configuration/EnvironmentWrapper');
const TokenValidationException = require('../exceptions/TokenValidationException');
const { lazyJwksClient } = require('./LazyJwksClient');

const logger = new LambdaLogger('TokenValidator');

async function validateToken(token) {
  logger.debug('validateToken - started');

  let principalId;
  let scope;
  let decoded;

  try {
    decoded = jwt.decode(token, { complete: true });
    const { header: { kid }, payload: { iss, aud } } = decoded;
    const client = lazyJwksClient(iss);
    const signingKey = await client.getSigningKey(kid);
    const publicKey = signingKey.getPublicKey();
    const issuer = env.ISSUER.split(';').map(x => x.trim());
    const audience = aud ? env.AUDIENCE.split(';').map(x => x.trim()) : undefined;
    const verified = jwt.verify(token, publicKey, { issuer, audience });
    principalId = verified.sub;
    scope = verified.scope;
  } catch (e) {
    logger.debug('validateToken - failed', e);
    throw new TokenValidationException();
  }

  logger.debug('validateToken - succeeded');

  return { principalId, scope, decoded };
}

module.exports = { validateToken };
