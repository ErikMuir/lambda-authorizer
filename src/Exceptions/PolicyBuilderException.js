import BaseException from './BaseException';

export default class PolicyBuilderException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'PolicyBuilderException';
  }
}
