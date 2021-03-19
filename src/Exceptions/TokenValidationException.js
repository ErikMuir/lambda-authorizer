import UnauthorizedException from './UnauthorizedException';

export default class TokenValidationException extends UnauthorizedException {
  constructor() {
    super();
    this.name = 'TokenValidationException';
  }
}
