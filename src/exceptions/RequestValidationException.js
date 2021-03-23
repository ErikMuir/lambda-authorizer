const UnauthorizedException = require('./UnauthorizedException');

module.exports = class RequestValidationException extends UnauthorizedException {
  constructor() {
    super();
    this.name = 'RequestValidationException';
  }
}
