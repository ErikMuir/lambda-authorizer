import { LambdaLogger } from '@erikmuir/lambda-utils';
import jwt from 'jsonwebtoken';
import env from '../configuration/EnvironmentWrapper';
import TokenValidationException from '../exceptions/TokenValidationException';
import { getSigningKey } from './LazyJwksClient';

export default class TokenValidator {
  constructor({ authorizationToken }) {
    this._logger = new LambdaLogger('TokenValidator');
    this._token = authorizationToken.replace('Bearer ', '');
    this._decoded = null;
    this._principalId = null;
    this._scope = null;
    this._validIssuers = env.ISSUER.split(';').map(x => x.trim());
    this._validAudiences = env.AUDIENCE.split(';').map(x => x.trim());
  }

  get decoded() { return this._decoded; }

  get principalId() { return this._principalId; }

  get scope() { return this._scope; }

  async validate() {
    this._logger.trace('Validating token');

    try {
      this._decoded = jwt.decode(this._token, { complete: true });
      const key = await getSigningKey(this._decoded);
      const { aud } = this._decoded.payload;
      const options = {
        issuer: env.ISSUER.split(';').map(x => x.trim()),
        audience: aud ? env.AUDIENCE.split(';').map(x => x.trim()) : undefined,
      };
      const verified = jwt.verify(this._token, key, options);
      this._principalId = verified.sub;
      this._scope = verified.scope;
    } catch (e) {
      this._logger.trace(`Could not validate token: ${e}`);
      throw new TokenValidationException();
    }

    this._logger.trace('Successfully validated token');
  }
}
