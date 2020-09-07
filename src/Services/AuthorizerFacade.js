import { LambdaLogger } from '@erikmuir/lambda-utils';
import RequestValidator from './RequestValidator';
import TokenValidator from './TokenValidator';
import PolicyBuilder from './PolicyBuilder';

export const authorize = request => {
  const logger = new LambdaLogger('AuthorizerFacade');
  const policyBuilder = new PolicyBuilder();

  try {
    logger.debug('Authorizing');

    const requestValidator = new RequestValidator(request);
    requestValidator.validate();
    policyBuilder.apiGatewayArn = requestValidator.apiGatewayArn;

    const tokenValidator = new TokenValidator(request.authorizationToken.replace('Bearer ', ''));
    tokenValidator.validate();
    policyBuilder.principalId = tokenValidator.principalId;

    policyBuilder.allowAllMethods();

    logger.debug('Authorization succeeded', { principalId });
  } catch (e) {
    if (!(e instanceof BaseException)) throw e;

    logger.debug('Authorization failed', e);

    // you may choose to throw an unauthorized exception here instead of returning a 'deny all' policy
    // throw new UnauthorizedException();

    policyBuilder.denyAllMethods();
  }
  
  // you can add primitive key-value pairs that can be accessed in API Gateway via $context.authorizer.<key>
  //   'key' must be a string
  //   'value' must be a string, number, or boolean
  // policyBuilder.context.set('key', 'value');
  
  return policyBuilder.build();
};
