const { LogEnv, LambdaLogger } = require('@erikmuir/lambda-utils');

exports.handler = async function (event, context) {
  LogEnv.lambdaEvent = event;
  LogEnv.lambdaContext = context;
  const logger = new LambdaLogger('index');

  try {
    const response = {}; // TODO : call authorizerFacade.authorize()

    logger.info('Authorizer response', responseBody);

    return response;
  } catch (e) {
    if (e instanceof UnauthorizedException) throw e;

    logger.error(`Unexpected error occurred: ${e.message}`, e);
    throw new UnauthorizedException();
  }
};
