import BaseException from './BaseException';

export default class JsonWebKeyServiceException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'JsonWebKeyServiceException';
  }
}
