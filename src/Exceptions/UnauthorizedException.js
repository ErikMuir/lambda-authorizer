export default class UnauthorizedException extends Error {
  constructor() {
    super("Unauthorized");
    this.name = 'UnauthorizedException';
  }
}
