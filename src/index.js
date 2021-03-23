const { LogEnv, LambdaLogger } = require('@erikmuir/lambda-utils');
const BaseException = require('./exceptions/BaseException');
const UnauthorizedException = require('./exceptions/UnauthorizedException');
const PolicyBuilder = require('./services/PolicyBuilder');
const { validateRequest } = require('./services/RequestValidator');
const { validateToken } = require('./services/TokenValidator');

module.exports.handler = async function (event, context) {
  LogEnv.initializeLambdaEnvironment({ event, context });

  const logger = new LambdaLogger('authorizer');
  const policyBuilder = new PolicyBuilder();

  logger.info('Authorizing');

  try {
    const { token, apiGatewayArn } = validateRequest(event);
    const { principalId, scope, decoded } = await validateToken(token);

    policyBuilder.apiGatewayArn = apiGatewayArn;
    policyBuilder.principalId = principalId;
    
    // You can add primitive key-value pairs that can be accessed in API Gateway
    // via $context.authorizer.<key>
    //   'key' must be a string
    //   'value' must be a string, number, or boolean
    policyBuilder.context.set('scope', scope);
    
    // You may choose to allow or deny specific actions on specific resources
    // as desired, perhaps driven by claims from the decoded jwt.
    // For this example we'll just allow all methods on all resources.
    policyBuilder.allowAllMethods();
    
    logger.info('Authorization succeeded', { principalId });
    
    return policyBuilder.build();
  } catch (e) {
    if (e instanceof BaseException) {
      logger.info(`Authorization failed: ${e}`);
    } else {
      logger.error(`Unexpected error occurred`, e);
    }

    throw new UnauthorizedException();
    // Instead of throwing here you could choose to return a "deny all" policy:
    // policyBuilder.denyAllMethods();
    // return policyBuilder.build();
  }
};
