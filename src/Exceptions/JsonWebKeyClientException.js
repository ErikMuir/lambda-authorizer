import BaseException from './BaseException';

export default class JsonWebKeyClientException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'JsonWebKeyClientException';
  }
}
