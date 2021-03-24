const PolicyBuilder = require('../../src/services/PolicyBuilder');
const ApiGatewayArn = require('../../src/models/ApiGatewayArn');
const Effect = require('../../src/models/Effect');
const HttpVerb = require('../../src/models/HttpVerb');
const PolicyDocument = require('../../src/models/PolicyDocument');
const PolicyStatement = require('../../src/models/PolicyStatement');
const PolicyBuilderException = require('../../src/exceptions/PolicyBuilderException');
const { PrimitiveMap, testUtils: { expectError } } = require('@erikmuir/node-utils');

const arnString = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/verb/path/to/resource';
const apiGatewayArn = ApiGatewayArn.parse(arnString);

describe('PolicyBuilder', () => {
  let testObject;

  beforeEach(() => {
    testObject = new PolicyBuilder();
  });

  describe('constructor', () => {
    test('sets context to instance of PrimitiveMap', () => {
      expect(testObject.context).toBeInstanceOf(PrimitiveMap);
    });

    test('sets apiGatewayArn to null', () => {
      expect(testObject.apiGatewayArn).toBe(null);
    });

    test('sets principalId to null', () => {
      expect(testObject.principalId).toBe(null);
    });

    test('sets usageIdentifierKey to null', () => {
      expect(testObject.usageIdentifierKey).toBe(null);
    });

    test('sets allowMethodArns to empty array', () => {
      expect(testObject.allowMethodArns).toEqual([]);
    });

    test('sets denyMethodArns to empty array', () => {
      expect(testObject.denyMethodArns).toEqual([]);
    });

    test('sets statements to empty array', () => {
      expect(testObject.statements).toEqual([]);
    });
  });

  describe('properties', () => {
    describe('apiGatewayArn', () => {
      test('can be set', () => {
        const expected = new ApiGatewayArn();
        testObject.apiGatewayArn = expected;
        expect(testObject.apiGatewayArn).toBe(expected);
      });

      test('throws when attempting to set to something other than ApiGatewayArn', () => {
        const action = () => (testObject.apiGatewayArn = 'foobar');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('principalId', () => {
      test('can be set', () => {
        const expected = 'foobar';
        testObject.principalId = expected;
        expect(testObject.principalId).toBe(expected);
      });

      test('throws when attempting to set to something other than a string', () => {
        const action = () => (testObject.principalId = 42);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('usageIdentifierKey', () => {
      test('can be set', () => {
        const expected = 'foobar';
        testObject.usageIdentifierKey = expected;
        expect(testObject.usageIdentifierKey).toBe(expected);
      });

      test('throws when attempting to set to something other than a string', () => {
        const action = () => (testObject.usageIdentifierKey = 42);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('allowMethodArns', () => {
      test('cannot be set', () => {
        const action = () => (testObject.allowMethodArns = ['arn']);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('denyMethodArns', () => {
      test('cannot be set', () => {
        const action = () => (testObject.denyMethodArns = ['arn']);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('statements', () => {
      test('cannot be set', () => {
        const action = () => (testObject.statements = [{}]);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('context', () => {
      test('cannot be set', () => {
        const action = () => (testObject.context = [{}]);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });
  });

  describe('methods', () => {
    const allowedVerbs = [
      HttpVerb.get,
      HttpVerb.post,
      HttpVerb.put,
      HttpVerb.patch,
      HttpVerb.head,
      HttpVerb.delete,
      HttpVerb.options,
      HttpVerb.all,
    ];

    describe('allowMethod', () => {
      allowedVerbs.forEach(verb => {
        test(`adds arn with '${verb}' verb and 'foobar' resource to allowMethodArns`, () => {
          testObject.allowMethod(verb, 'foobar');
          expect(testObject.allowMethodArns.length).toBe(1);
          expect(testObject.allowMethodArns[0]).toEqual(new ApiGatewayArn({ verb, resource: 'foobar' }));
        });
      });
    });
    
    describe('denyMethod', () => {
      allowedVerbs.forEach(verb => {
        test(`adds arn with '${verb}' verb and 'foobar' resource to denyMethodArns`, () => {
          testObject.denyMethod(verb, 'foobar');
          expect(testObject.denyMethodArns.length).toBe(1);
          expect(testObject.denyMethodArns[0]).toEqual(new ApiGatewayArn({ verb, resource: 'foobar' }));
        });
      });
    });

    describe('allowAllMethods', () => {
      test('adds arn with all verbs and all resources to allowMethodArns', () => {
        testObject.allowAllMethods();
        expect(testObject.allowMethodArns.length).toBe(1);
        expect(testObject.allowMethodArns[0]).toEqual(new ApiGatewayArn({ verb: '*', resource: '*' }));
      });
    });
    
    describe('denyAllMethods', () => {
      test('adds arn with all verbs and all resources to denyMethodArns', () => {
        testObject.denyAllMethods();
        expect(testObject.denyMethodArns.length).toBe(1);
        expect(testObject.denyMethodArns[0]).toEqual(new ApiGatewayArn({ verb: '*', resource: '*' }));
      });
    });

    describe('addMethod', () => {
      test('strips leading slash from resource', () => {
        testObject.addMethod(Effect.allow, HttpVerb.all, '/foobar');
        expect(testObject.allowMethodArns.length).toBe(1);
        expect(testObject.allowMethodArns[0]).toEqual(new ApiGatewayArn({ verb: '*', resource: 'foobar' }));
      });

      test('throws error when effect is not provided', () => {
        const action = () => testObject.addMethod(undefined, '*', '*');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });

      test('throws error when effect is invalid', () => {
        const action = () => testObject.addMethod('invalid-method', '*', '*');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });

      test('throws error when verb is not provided', () => {
        const action = () => testObject.addMethod(Effect.allow, undefined, '*');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });

      test('throws error when verb is invalid', () => {
        const action = () => testObject.addMethod(Effect.allow, 'invalid-verb', '*');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });

      test('throws error when resource is not provided', () => {
        const action = () => testObject.addMethod(Effect.allow, '*', undefined);
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });

      test('throws error when resource is invalid', () => {
        const action = () => testObject.addMethod(Effect.allow, '*', '?@#$%');
        const assertions = e => expect(e).toBeInstanceOf(PolicyBuilderException);
        expectError(action, assertions);
      });
    });

    describe('build', () => {
      describe('statements', () => {
        test('when apiGatewayArn is not set', () => {
          testObject.allowAllMethods();
          testObject.build();
          expect(testObject.statements).toEqual([]);
        });

        test('when apiGatewayArn is set', () => {
          testObject.apiGatewayArn = apiGatewayArn;
          testObject.allowAllMethods();
          testObject.build();
          expect(testObject.statements.length).toBe(1);
          expect(testObject.statements[0]).toBeInstanceOf(PolicyStatement);
        });

        test('when apiGatewayArn is missing some fields', () => {
          const slimArnObject = {
            partition: 'partition',
            service: 'service',
            awsAccountId: 'aws-account-id',
          };
          const slimArn = new ApiGatewayArn(slimArnObject);
          const expected = `arn:partition:service:*:aws-account-id:*/*/*/*`;
          testObject.apiGatewayArn = slimArn;
          testObject.allowAllMethods();
          testObject.build();
          const statement = testObject.statements[0];
          expect(statement.Resource[0]).toBe(expected);
        });
      });

      test('returns principalId', () => {
        testObject.principalId = 'foobar';
        const policy = testObject.build();
        expect(policy.principalId).toBe('foobar');
      });

      test('returns usageIdentifierKey', () => {
        testObject.usageIdentifierKey = 'foobar';
        const policy = testObject.build();
        expect(policy.usageIdentifierKey).toBe('foobar');
      });

      test('returns context as object', () => {
        testObject.context.set('foo', 'bar');
        const policy = testObject.build();
        expect(policy.context).toEqual({ foo: 'bar' });
      });

      test('returns policyDocument', () => {
        const policy = testObject.build();
        expect(policy.policyDocument).toBeInstanceOf(PolicyDocument);
      });

      test('returns expected policyDocuemnt', () => {
        const expectedArn = 'arn:partition:service:region:aws-account-id:rest-api-id/stage/*/*';
        const expectedStatement = new PolicyStatement({ effect: Effect.allow, arn: expectedArn });
        const expectedDocument = new PolicyDocument([expectedStatement]);
        testObject.apiGatewayArn = apiGatewayArn;
        testObject.allowAllMethods();
        const policy = testObject.build();
        expect(policy.policyDocument).toEqual(expectedDocument);
      });
    });
  });
});
