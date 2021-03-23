const { LambdaLogger } = require('@erikmuir/lambda-utils');
const jwt = require('jsonwebtoken');
const env = require('../configuration/EnvironmentWrapper');
const TokenValidationException = require('../exceptions/TokenValidationException');
const { getSigningKey } = require('./LazyJwksClient');

const logger = new LambdaLogger('TokenValidator');

async function validateToken(token) {
  logger.debug('validateToken - started');

  let principalId;
  let scope;
  let decoded;

  try {
    decoded = jwt.decode(token, { complete: true });
    const key = await getSigningKey(decoded);
    const { aud } = decoded.payload;
    const options = {
      issuer: env.ISSUER.split(';').map(x => x.trim()),
      audience: aud ? env.AUDIENCE.split(';').map(x => x.trim()) : undefined,
    };
    const verified = jwt.verify(token, key, options);
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
