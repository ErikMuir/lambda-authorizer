import BaseException from './BaseException';

export default class ClaimsPrincipalException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'ClaimsPrincipalException';
  }
}
