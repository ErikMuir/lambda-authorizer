const { expectError } = require('@erikmuir/node-utils/src/utilities/test-utils');
const jwt = require('jsonwebtoken');
const { validateToken } = require('../../src/services/TokenValidator');
const { lazyJwksClient } = require('../../src/services/LazyJwksClient');
const TokenValidationException = require('../../src/exceptions/TokenValidationException');

jest.mock('jsonwebtoken');
jest.mock('../../src/services/LazyJwksClient');

describe('TokenValidator', () => {
  describe('validateToken', () => {
    const token = 'token';
    const sub = 'user-id';
    const scope = 'scope';
    const kid = 'kid';
    const iss = 'https://foobar.com';
    const aud = 'audience';
    const decoded = { header: { kid }, payload: { iss, aud } };
    const verified = { sub, scope };
    const publicKey = 'public-key';
    const getSigningKey = jest.fn();
    const getPublicKey = jest.fn();
    const client = { getSigningKey };
    const signingKey = { getPublicKey };
    const envIssuer = 'issuer';
    const envAudience = 'audience';
    
    let originalEnv;

    beforeAll(() => {
      originalEnv = { ...process.env };
    });

    beforeEach(() => {
      jwt.decode.mockReturnValue(decoded);
      jwt.verify.mockReturnValue(verified);
      lazyJwksClient.mockReturnValue(client);
      getSigningKey.mockResolvedValue(signingKey);
      getPublicKey.mockReturnValue(publicKey);
      process.env['ISSUER'] = envIssuer;
      process.env['AUDIENCE'] = envAudience;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    test('calls jwt.decode', async () => {
      await validateToken(token);

      expect(jwt.decode).toHaveBeenCalledTimes(1);
      expect(jwt.decode.mock.calls[0][0]).toBe(token);
      expect(jwt.decode.mock.calls[0][1].complete).toBe(true);
    });

    test('calls lazyJwksClient', async () => {
      await validateToken(token);

      expect(lazyJwksClient).toHaveBeenCalledTimes(1);
      expect(lazyJwksClient.mock.calls[0][0]).toBe(iss);
    });

    test('calls getSigningKey', async () => {
      await validateToken(token);

      expect(getSigningKey).toHaveBeenCalledTimes(1);
      expect(getSigningKey.mock.calls[0][0]).toBe(kid);
    });

    test('calls getPublicKey', async () => {
      await validateToken(token);

      expect(getPublicKey).toHaveBeenCalledTimes(1);
    });

    test('calls jwt.verify', async () => {
      await validateToken(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify.mock.calls[0][0]).toBe(token);
      expect(jwt.verify.mock.calls[0][1]).toBe(publicKey);
      expect(jwt.verify.mock.calls[0][2].issuer).toEqual([envIssuer]);
      expect(jwt.verify.mock.calls[0][2].audience).toEqual([envAudience]);
    });

    test('sets issuer correctly when there are multiple issuers', async () => {
      process.env['ISSUER'] = 'foo; bar; baz';

      await validateToken(token);

      expect(jwt.verify.mock.calls[0][2].issuer).toEqual(['foo', 'bar', 'baz']);
    });

    test('sets audience correctly when there are multiple audiences', async () => {
      process.env['AUDIENCE'] = 'foo; bar; baz';

      await validateToken(token);

      expect(jwt.verify.mock.calls[0][2].audience).toEqual(['foo', 'bar', 'baz']);
    });

    test('does not pass audience when jwt has no aud claim', async () => {
      const decodedWithNoAudience = { header: { kid }, payload: { iss } };
      jwt.decode.mockReturnValue(decodedWithNoAudience);
      process.env['AUDIENCE'] = 'foo; bar; baz';

      await validateToken(token);

      expect(jwt.verify.mock.calls[0][2].audience).not.toBeDefined();
    });

    test('returns response', async () => {
      const actual = await validateToken(token);

      expect(actual).toBeDefined();
      expect(actual.principalId).toBe(sub);
      expect(actual.scope).toBe(scope);
      expect(actual.decoded).toBe(decoded);
    });

    test('throws TokenValidationException', async () => {
      jwt.decode.mockImplementation(() => { throw new Error(); });

      const action = async () => await validateToken(token);
      const assertions = e => expect(e).toBeInstanceOf(TokenValidationException);

      expectError(action, assertions);
    });
  });
});
