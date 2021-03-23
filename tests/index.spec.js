const { handler } = require('../src/index');
const { LogEnv } = require('@erikmuir/lambda-utils');
const { authorize } = require('../src/services/AuthorizerFacade');
const UnauthorizedException = require('../src/exceptions/UnauthorizedException');

jest.mock('@erikmuir/lambda-utils/src/utilities/LambdaLogger');
jest.mock('../src/services/AuthorizerFacade');

describe('index', () => {
  describe('handler', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('sets event on environment wrapper', async () => {
      const event = { foo: 'bar' };

      await handler(event, {});

      expect(LogEnv.lambdaEvent).toBe(event);
    });

    test('sets context on environment wrapper', async () => {
      const context = { foo: 'bar' };

      await handler({}, context);

      expect(LogEnv.lambdaContext).toBe(context);
    });

    test('calls authorize', async () => {
      const event = {};

      await handler(event, {});

      expect(authorize).toHaveBeenCalledTimes(1);
      expect(authorize).toHaveBeenCalledWith(event);
    });

    test('when unauthorized exception is thrown, then rethrows', async () => {
      const exception = new UnauthorizedException();
      authorize.mockImplementation(() => {
        throw exception;
      });

      try {
        await handler();

        expect(true).toBe(false); // should never happen
      } catch (e) {
        expect(e).toBe(exception);
      }
    });

    test('when a non-unauthorized exception is thrown, then throws new unauthorized exception', async () => {
      const exception = new Error();
      authorize.mockImplementation(() => {
        throw exception;
      });

      try {
        await handler();

        expect(true).toBe(false); // should never happen
      } catch (e) {
        expect(e).not.toBe(exception);
        expect(e instanceof UnauthorizedException).toBe(true);
      }
    });

    test('returns response', async () => {
      const response = {};
      authorize.mockReturnValue(response);

      const actual = await handler();

      expect(actual).toBe(response);
    });
  });
});
