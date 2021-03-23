const BaseException = require('./BaseException');

module.exports = class PolicyBuilderException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'PolicyBuilderException';
  }
}
