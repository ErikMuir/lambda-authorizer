const { LambdaLogger } = require('@erikmuir/lambda-utils');
const ApiGatewayArn = require('../models/ApiGatewayArn');
const ApiGatewayArnException = require('../exceptions/ApiGatewayArnException');
const RequestValidationException = require('../exceptions/RequestValidationException');

const logger = new LambdaLogger('RequestValidator');

function validateRequest(request) {
  logger.debug('validateRequest - started');

  const errors = [];
  const authTokenPattern = new RegExp('^Bearer .*$');
  let apiGatewayArn;
  let token;

  if (!request) {
    errors.push('Request is required.');
  } else {
    const { type, authorizationToken, methodArn } = request;

    if (!type) {
      errors.push('Expected "type" to have been provided.');
    } else if (type.toUpperCase() !== 'TOKEN') {
      errors.push('Expected "type" to have value "TOKEN".');
    }

    if (!authorizationToken) {
      errors.push('Expected "authorizationToken" to have been provided.');
    } else if (!authTokenPattern.test(authorizationToken)) {
      errors.push('Expected "authorizationToken" to match "^Bearer .*$".');
    } else {
      token = authorizationToken.replace('Bearer ', '');
    }

    if (!methodArn) {
      errors.push('Expected "methodArn" to have been provided.');
    } else {
      try {
        apiGatewayArn = ApiGatewayArn.parse(methodArn);
      } catch (e) {
        if (e instanceof ApiGatewayArnException) {
          errors.push(`Could not parse "methodArn": "${methodArn}".`);
        } else {
          throw e;
        }
      }
    }
  }

  if (errors.length > 0) {
    logger.debug('validateRequest - failed', { requestValidationErrors: errors });
    throw new RequestValidationException();
  }

  logger.debug('validateRequest - succeeded');

  return { token, apiGatewayArn };
}

module.exports = { validateRequest };
