const BaseException = require('../../src/exceptions/BaseException');
const ApiGatewayArnException = require('../../src/exceptions/ApiGatewayArnException');
const PolicyBuilderException = require('../../src/exceptions/PolicyBuilderException');
const TokenValidationException = require('../../src/exceptions/TokenValidationException');
const UnauthorizedException = require('../../src/exceptions/UnauthorizedException');
const RequestValidationException = require('../../src/exceptions/RequestValidationException');

describe('exceptions', () => {
  test('BaseException', () => {
    const err = new BaseException('foobar');

    expect(err instanceof BaseException).toBe(true);
    expect(BaseException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('BaseException');
    expect(err.name).toBe('BaseException');
    expect(err.message).toBe('foobar');
    expect(err.toString()).toBe('BaseException: foobar');
    expect(err.stack).toBeDefined();
  });

  test('ApiGatewayArnException', () => {
    const err = new ApiGatewayArnException('foobar');

    expect(err instanceof ApiGatewayArnException).toBe(true);
    expect(ApiGatewayArnException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof BaseException).toBe(true);
    expect(BaseException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('ApiGatewayArnException');
    expect(err.name).toBe('ApiGatewayArnException');
    expect(err.message).toBe('foobar');
    expect(err.toString()).toBe('ApiGatewayArnException: foobar');
    expect(err.stack).toBeDefined();
  });

  test('PolicyBuilderException', () => {
    const err = new PolicyBuilderException('foobar');

    expect(err instanceof PolicyBuilderException).toBe(true);
    expect(PolicyBuilderException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof BaseException).toBe(true);
    expect(BaseException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('PolicyBuilderException');
    expect(err.name).toBe('PolicyBuilderException');
    expect(err.message).toBe('foobar');
    expect(err.toString()).toBe('PolicyBuilderException: foobar');
    expect(err.stack).toBeDefined();
  });

  test('TokenValidationException', () => {
    const err = new TokenValidationException('foobar');

    expect(err instanceof TokenValidationException).toBe(true);
    expect(TokenValidationException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof UnauthorizedException).toBe(true);
    expect(UnauthorizedException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('TokenValidationException');
    expect(err.name).toBe('TokenValidationException');
    expect(err.message).toBe('Unauthorized');
    expect(err.toString()).toBe('TokenValidationException: Unauthorized');
    expect(err.stack).toBeDefined();
  });

  test('UnauthorizedException', () => {
    const err = new UnauthorizedException();

    expect(err instanceof UnauthorizedException).toBe(true);
    expect(UnauthorizedException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('UnauthorizedException');
    expect(err.name).toBe('UnauthorizedException');
    expect(err.message).toBe('Unauthorized');
    expect(err.toString()).toBe('UnauthorizedException: Unauthorized');
    expect(err.stack).toBeDefined();
  });

  test('RequestValidationException', () => {
    const err = new RequestValidationException();

    expect(err instanceof RequestValidationException).toBe(true);
    expect(RequestValidationException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof UnauthorizedException).toBe(true);
    expect(UnauthorizedException.prototype.isPrototypeOf(err)).toBe(true);
    expect(err instanceof Error).toBe(true);
    expect(Error.prototype.isPrototypeOf(err)).toBe(true);
    expect(err.constructor.name).toBe('RequestValidationException');
    expect(err.name).toBe('RequestValidationException');
    expect(err.message).toBe('Unauthorized');
    expect(err.toString()).toBe('RequestValidationException: Unauthorized');
    expect(err.stack).toBeDefined();
  });
});
