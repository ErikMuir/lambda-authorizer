import { LogEnv, LambdaLogger } from '@erikmuir/lambda-utils';
import { authorize } from './services/AuthorizerFacade';
import UnauthorizedException from './exceptions/UnauthorizedException';

exports.handler = async function (event, context) {
  LogEnv.lambdaEvent = event;
  LogEnv.lambdaContext = context;
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
