const { LambdaLogger } = require('@erikmuir/lambda-utils');
const RequestValidator = require('./RequestValidator');
const TokenValidator = require('./TokenValidator');
const PolicyBuilder = require('./PolicyBuilder');
const UnauthorizedException = require('../exceptions_/UnauthorizedException');

module.exports.authorize = request => {
  const logger = new LambdaLogger('AuthorizerFacade');

  try {
    logger.debug('Authorizing');

    const policyBuilder = new PolicyBuilder();
    const requestValidator = new RequestValidator(request);
    const tokenValidator = new TokenValidator(request);

    requestValidator.validate();
    tokenValidator.validate();

    policyBuilder.apiGatewayArn = requestValidator.apiGatewayArn;
    policyBuilder.principalId = tokenValidator.principalId;

    // you may choose to allow or deny actions on resources as desired,
    // perhaps driven by claims from tokenValidator.decoded
    // for this example we'll just allow all methods on all resources.
    policyBuilder.allowAllMethods();

    // you can also add primitive key-value pairs that can be accessed in API Gateway via $context.authorizer.<key>
    //   'key' must be a string
    //   'value' must be a string, number, or boolean
    policyBuilder.context.set('scope', tokenValidator.scope);

    logger.debug('Authorization succeeded', { principalId: tokenValidator.principalId });

    return policyBuilder.build();
  } catch (e) {
    logger.debug('Authorization failed', e);
    throw new UnauthorizedException();
  }
};
