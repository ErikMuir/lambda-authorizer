import ApiGatewayArn from '../../src/Models/ApiGatewayArn';
import ApiGatewayArnException from '../../src/Exceptions/ApiGatewayArnException';

describe('ApiGatewayArn', () => {
  const stringArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';
  const objectArn = {
    partition: 'partition',
    service: 'service',
    region: 'region',
    awsAccountId: 'aws-account-id',
    restApiId: 'rest-api-id',
    stage: 'stage',
    verb: 'verb',
    resource: 'path/to/resource',
  };

  describe('constructor', () => {
    const actual = new ApiGatewayArn(objectArn);

    test('sets partition', () => {
      expect(actual.partition).toBe('partition');
    });

    test('sets service', () => {
      expect(actual.service).toBe('service');
    });

    test('sets region', () => {
      expect(actual.region).toBe('region');
    });

    test('sets awsAccountId', () => {
      expect(actual.awsAccountId).toBe('aws-account-id');
    });

    test('sets restApiId', () => {
      expect(actual.restApiId).toBe('rest-api-id');
    });

    test('sets stage', () => {
      expect(actual.stage).toBe('stage');
    });

    test('sets verb', () => {
      expect(actual.verb).toBe('verb');
    });

    test('sets resource', () => {
      expect(actual.resource).toBe('path/to/resource');
    });
  });

  describe('static parse', () => {
    describe('returns new instance of ApiGatewayArn', () => {
      const actual = ApiGatewayArn.parse(stringArn);

      test('sets partition', () => {
        expect(actual.partition).toBe('partition');
      });

      test('sets service', () => {
        expect(actual.service).toBe('service');
      });

      test('sets region', () => {
        expect(actual.region).toBe('region');
      });

      test('sets awsAccountId', () => {
        expect(actual.awsAccountId).toBe('aws-account-id');
      });

      test('sets restApiId', () => {
        expect(actual.restApiId).toBe('rest-api-id');
      });

      test('sets stage', () => {
        expect(actual.stage).toBe('stage');
      });

      test('sets verb', () => {
        expect(actual.verb).toBe('verb');
      });

      test('sets resource', () => {
        expect(actual.resource).toBe('path/to/resource');
      });
    });

    describe('throws ApiGatewayArnException', () => {
      [
        { value: undefined, desc: 'when value is undefined' },
        { value: null, desc: 'when value is null' },
        { value: '', desc: 'when value is empty string' },
        { value: 'this-is:a:bad/method/arn', desc: 'when value is not a valid method arn' },
      ].forEach(({ value, desc }) => {
        test(desc, () => {
          try {
            ApiGatewayArn.parse(value);

            expect(true).toBe(false); // should never happen
          } catch (e) {
            expect(e instanceof ApiGatewayArnException).toBe(true);
          }
        });
      });
    });
  });

  describe('toString', () => {
    const actual = ApiGatewayArn.parse(stringArn);

    test('returns arn in correct format', () => {
      expect(actual.toString()).toBe(stringArn);
    });
  });
});
