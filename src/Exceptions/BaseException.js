module.exports = class BaseException extends Error {
  constructor(message) {
    super(message);
    this.name = 'BaseException';
  }

  toString = () => `${this.name}: ${this.message}`;
}
