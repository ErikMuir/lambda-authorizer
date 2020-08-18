import BaseException from './BaseException';

export default class ApiGatewayArnException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'ApiGatewayArnException';
  }
}
