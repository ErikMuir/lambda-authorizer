import BaseException from './BaseException';

export default class TokenValidationException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'TokenValidationException';
  }
}
