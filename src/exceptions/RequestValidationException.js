const BaseException = require('./BaseException');

module.exports = class RequestValidationException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'RequestValidationException';
  }
}
