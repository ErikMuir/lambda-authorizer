const { expectError } = require('@erikmuir/node-utils/src/utilities/test-utils');
const { LogEnv } = require('@erikmuir/lambda-utils');
const { handler } = require('../src/index');
const ApiGatewayArnException = require('../src/exceptions/ApiGatewayArnException');
const BaseException = require('../src/exceptions/BaseException');
const PolicyBuilderException = require('../src/exceptions/PolicyBuilderException');
const RequestValidationException = require('../src/exceptions/RequestValidationException');
const TokenValidationException = require('../src/exceptions/TokenValidationException');
const UnauthorizedException = require('../src/exceptions/UnauthorizedException');
const ApiGatewayArn = require('../src/models/ApiGatewayArn');
const PolicyDocument = require('../src/models/PolicyDocument');
const { validateRequest } = require('../src/services/RequestValidator');
const { validateToken } = require('../src/services/TokenValidator');

jest.mock('@erikmuir/lambda-utils/src/utilities/LambdaLogger');
jest.mock('../src/services/RequestValidator');
jest.mock('../src/services/TokenValidator');


describe('index', () => {
  describe('handler', () => {
    const event = { foo: 'bar' };
    const context = { foo: 'bar' };
    const token = 'Bearer xyz';
    const stringArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';
    const apiGatewayArn = ApiGatewayArn.parse(stringArn);
    const principalId = 'user-123';
    const scope = 'scope-abc';

    beforeEach(() => {
      jest.clearAllMocks();
      validateRequest.mockReturnValue({ token, apiGatewayArn });
      validateToken.mockResolvedValue({ principalId, scope });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('sets event on environment wrapper', async () => {
      await handler(event, {});

      expect(LogEnv.lambdaEvent).toBe(event);
    });

    test('sets context on environment wrapper', async () => {
      await handler({}, context);

      expect(LogEnv.lambdaContext).toBe(context);
    });

    test('calls validateRequest', async () => {
      await handler(event, {});

      expect(validateRequest).toHaveBeenCalledTimes(1);
      expect(validateRequest).toHaveBeenCalledWith(event);
    });

    test('calls validateToken', async () => {
      await handler();

      expect(validateToken).toHaveBeenCalledTimes(1);
      expect(validateToken).toHaveBeenCalledWith(token);
    });

    [
      new Error(),
      new TypeError(),
      new ApiGatewayArnException(),
      new BaseException(),
      new PolicyBuilderException(),
      new RequestValidationException(),
      new TokenValidationException(),
      new UnauthorizedException(),
    ].forEach(error => {
      test(`when ${error.name} is thrown, then throws new UnauthorizedException`, async () => {
        validateToken.mockImplementation(() => { throw error; });
        const action = async () => await handler();
        const assertions = e => expect(e).toBeInstanceOf(UnauthorizedException);

        expectError(action, assertions);
      });
    });

    test('returns response', async () => {
      const actual = await handler();

      expect(actual).toBeDefined();
      expect(actual.principalId).toBe(principalId);
      expect(actual.policyDocument).toBeDefined();
      expect(actual.policyDocument instanceof PolicyDocument).toBe(true);
      expect(actual.context).toBeDefined();
      expect(actual.context.scope).toBe(scope);
    });
  });
});
