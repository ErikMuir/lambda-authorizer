import UnauthorizedException from './UnauthorizedException';

export default class RequestValidationException extends UnauthorizedException {
  constructor() {
    super();
    this.name = 'RequestValidationException';
  }
}
