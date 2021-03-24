const { validateRequest } = require('../../src/services/RequestValidator');
const RequestValidationException = require('../../src/exceptions/RequestValidationException');
const ApiGatewayArn = require('../../src/models/ApiGatewayArn');

describe('RequestValidator', () => {
  const type = 'TOKEN';
  const authorizationToken = 'Bearer xyz';
  const methodArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';

  describe('validateRequest', () => {
    test('returns response', () => {
      const request = { type, authorizationToken, methodArn };

      const actual = validateRequest(request);

      expect(actual).toBeDefined();
      expect(actual.token).toBe('xyz');
      expect(actual.apiGatewayArn).toBeInstanceOf(ApiGatewayArn);
    });

    describe('throws RequestValidationException', () => {
      [
        { request: undefined, desc: 'when request is undefined' },
        { request: null, desc: 'when request is null' },
        { request: { authorizationToken, methodArn }, desc: 'when type not provided' },
        { request: { type: 'bad-type', authorizationToken, methodArn }, desc: 'when type is not "TOKEN"' },
        { request: { type, methodArn }, desc: 'when authorizationToken not provided' },
        { request: { type, authorizationToken: 'bad-token', methodArn }, desc: 'when authorizationToken does not match "^Bearer .*$"' },
        { request: { type, authorizationToken }, desc: 'when methodArn not provided' },
        { request: { type, authorizationToken, methodArn: 'bad-arn' }, desc: 'when methodArn cannot be parsed' },
      ].forEach(({ request, desc }) => {
        test(desc, () => {
          try {
            validateRequest(request);

            expect(true).toBe(false); // should never happen
          } catch (e) {
            expect(e).toBeInstanceOf(RequestValidationException);
          }
        });
      });
    });
  });
});
