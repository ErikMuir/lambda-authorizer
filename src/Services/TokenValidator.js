import { LambdaLogger } from '@erikmuir/lambda-utils';
import env from '../configuration/EnvironmentWrapper';

export default class TokenValidator {
  constructor(token) {
    this._logger = new LambdaLogger('TokenValidator');
    this._token = token;
    this._principalId = null;
    this._jwtConfig = {
      validIssuer: env.issuer,
      validAudience: env.audience,
      issuerSigningKeys: env.jwks,
    };
  }

  get principalId() { return this._principalId; }

  validate() {
    // TODO
  }
}
