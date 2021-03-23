const { LambdaLogger } = require('@erikmuir/lambda-utils');
const jwt = require('jsonwebtoken');
const ApiGatewayArn = require('../models_/ApiGatewayArn');
const ApiGatewayArnException = require('../exceptions_/ApiGatewayArnException');
const RequestValidationException = require('../exceptions_/RequestValidationException');

module.exports = class RequestValidator {
  constructor(request) {
    this._logger = new LambdaLogger('RequestValidationService');
    this._request = request;
    this._errors = [];
    this._token = null;
    this._apiGatewayArn = null;
    this._authTokenPattern = new RegExp('^Bearer .*$');
  }

  get token() { return this._token; }

  get apiGatewayArn() { return this._apiGatewayArn; }

  validate() {
    this._logger.trace('Validating request');

    if (!this._request) {
      this._errors.push('Request is required.');
    } else {
      const { type, authorizationToken, methodArn } = this._request;

      if (!type) {
        this._errors.push('Expected "type" to have been provided.');
      } else if (type.toUpperCase() !== 'TOKEN') {
        this._errors.push('Expected "type" to have value "TOKEN".');
      }

      if (!authorizationToken) {
        this._errors.push('Expected "authorizationToken" to have been provided.');
      } else if (!this._authTokenPattern.test(authorizationToken)) {
        this._errors.push('Expected "authorizationToken" to match "^Bearer .*$".');
      } else {
        this._token = authorizationToken.replace('Bearer ', '');
        const decoded = jwt.decode(this._token, { complete: true });
        if (decoded === null) {
          this._errors.push('Malformed authorization token cannot be JWT decoded.');
        }
      }

      if (!methodArn) {
        this._errors.push('Expected "methodArn" to have been provided.');
      } else {
        try {
          this._apiGatewayArn = ApiGatewayArn.parse(methodArn);
        } catch (e) {
          if (e instanceof ApiGatewayArnException) {
            this._errors.push(`Could not parse "methodArn": "${methodArn}".`);
          } else {
            throw e;
          }
        }
      }
    }

    if (this._errors.length > 0) {
      this._logger.trace('Request validation failed', { requestValidationErrors: this._errors });
      throw new RequestValidationException();
    }

    this._logger.trace('Successfully validated request');
  }
}
