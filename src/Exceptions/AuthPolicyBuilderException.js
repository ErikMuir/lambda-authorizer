import BaseException from './BaseException';

export default class AuthPolicyBuilderException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'AuthPolicyBuilderException';
  }
}
