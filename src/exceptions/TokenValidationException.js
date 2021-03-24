const BaseException = require('./BaseException');

module.exports = class TokenValidationException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'TokenValidationException';
  }
}
