const { LogEnv, LambdaLogger } = require('@erikmuir/lambda-utils');
const { authorize } = require('./services/AuthorizerFacade');
const UnauthorizedException = require('./exceptions/UnauthorizedException');

module.exports.handler = async function (event, context) {
  LogEnv.initializeLambdaEnvironment({ event, context });
  const logger = new LambdaLogger('index');

  try {
    const request = event;
    const response = authorize(request);

    logger.info('Authorizer response', response);

    return response;
  } catch (e) {
    if (e instanceof UnauthorizedException) throw e;
    
    logger.error(`Unexpected error occurred: ${e.message}`, e);
    throw new UnauthorizedException();
  }
};
