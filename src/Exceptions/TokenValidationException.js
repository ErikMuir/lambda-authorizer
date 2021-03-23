const UnauthorizedException = require('./UnauthorizedException');

module.exports = class TokenValidationException extends UnauthorizedException {
  constructor() {
    super();
    this.name = 'TokenValidationException';
  }
}
