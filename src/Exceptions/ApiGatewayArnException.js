const BaseException = require('./BaseException');

module.exports = class ApiGatewayArnException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'ApiGatewayArnException';
  }
}
