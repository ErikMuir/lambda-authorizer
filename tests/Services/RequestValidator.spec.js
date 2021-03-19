import jwt from 'jsonwebtoken';
import RequestValidator from '../../src/services/RequestValidator';
import RequestValidationException from '../../src/exceptions/RequestValidationException';
import ApiGatewayArn from '../../src/models/ApiGatewayArn';

jest.mock('@erikmuir/lambda-utils/dist/utilities/LambdaLogger');
jest.mock('jsonwebtoken');

describe('RequestValidator', () => {
  const type = 'TOKEN';
  const authorizationToken = 'Bearer xyz';
  const methodArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';
  const mockDecode = jwt.decode;

  beforeEach(() => {
    mockDecode.mockReturnValue('foobar');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('validate', () => {
    describe('does not throw', () => {
      test('when type, authorizationToken, and methodArn are valid', () => {
        const request = { type, authorizationToken, methodArn };
        const validator = new RequestValidator(request);

        try {
          validator.validate();

          expect(true).toBe(true);
        } catch (e) {
          expect(true).toBe(false); // should never happen
        }
      });
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
          const validator = new RequestValidator(request);

          try {
            validator.validate();

            expect(true).toBe(false); // should never happen
          } catch (e) {
            expect(e instanceof RequestValidationException).toBe(true);
          }
        });
      });

      test('when authorizationToken cannot be jwt decoded', () => {
        const request = { type, authorizationToken, methodArn };
        const validator = new RequestValidator(request);
        mockDecode.mockReturnValue(null);

        try {
          validator.validate();

          expect(true).toBe(false); // should never happen
        } catch (e) {
          expect(e instanceof RequestValidationException).toBe(true);
        }
      });
    });
  });

  test('apiGatewayArn getter', () => {
    const request = { type, authorizationToken, methodArn };
    const validator = new RequestValidator(request);
    validator.validate();

    const apiGatewayArn = validator.apiGatewayArn;

    expect(apiGatewayArn).toBeDefined();
    expect(apiGatewayArn instanceof ApiGatewayArn).toBe(true);
    expect(apiGatewayArn.toString()).toBe(methodArn);
  });
});
