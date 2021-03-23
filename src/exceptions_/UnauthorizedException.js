module.exports = class UnauthorizedException extends Error {
  constructor() {
    super("Unauthorized");
    this.name = 'UnauthorizedException';
  }
}
