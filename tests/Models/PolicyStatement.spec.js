import PolicyStatement from '../../src/models/PolicyStatement';
import Effect from '../../src/models/Effect';
import ApiGatewayArn from '../../src/models/ApiGatewayArn';

describe('PolicyStatement', () => {
  describe('constructor', () => {
    const expectedAction = 'execute-api:Invoke';

    describe('when params provided', () => {
      const effect = Effect.allow;
      const stringArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';
      const arn = ApiGatewayArn.parse(stringArn);
      const actual = new PolicyStatement({ effect, arn });

      test('sets Effect', () => {
        expect(actual.Effect).toBe(Effect.allow);
      });

      test('sets Resource', () => {
        expect(actual.Resource).toBeDefined();
        expect(actual.Resource.length).toBe(1);
        expect(actual.Resource[0]).toBe(stringArn);
      });

      test('sets Action to default value', () => {
        expect(actual.Action).toBeDefined();
        expect(actual.Action.length).toBe(1);
        expect(actual.Action[0]).toBe(expectedAction);
      });
    });

    describe('when no params provided', () => {
      const actual = new PolicyStatement();

      test('does not blow up', () => {
        expect(actual).toBeDefined();
      });

      test('does not set Effect', () => {
        expect(actual.Effect).not.toBeDefined();
      });

      test('sets Resource to empty list', () => {
        expect(actual.Resource).toBeDefined();
        expect(actual.Resource.length).toBe(0);
      });

      test('sets Action to default value', () => {
        expect(actual.Action).toBeDefined();
        expect(actual.Action.length).toBe(1);
        expect(actual.Action[0]).toBe(expectedAction);
      });
    });
  });
});
