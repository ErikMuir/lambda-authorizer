const jwksClient = require('jwks-rsa');
const { lazyJwksClient, jwksClientCache } = require('../../src/services/LazyJwksClient');

jest.mock('jwks-rsa');

describe('LazyJwksClient', () => {
  const issuer = 'foobar.com';
  const expectedJwksUri = 'foobar.com/.well-known/jwks.json';
  const expectedClient = {};

  beforeAll(() => {
    jwksClient.mockReturnValue(expectedClient);
  });

  beforeEach(() => {
    delete jwksClientCache[expectedJwksUri];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns jwksClient', () => {
    const actual = lazyJwksClient(issuer);

    expect(actual).toBe(expectedClient);
  });

  [issuer, `${issuer}/`].forEach(i => {
    test(`sets jwksUri correctly when issuer is ${i}`, () => {
      lazyJwksClient(i);

      expect(jwksClientCache[expectedJwksUri]).toBeDefined();
    });
  });

  test('calls jwksClient when jwksUri client does not exist', () => {
    lazyJwksClient(issuer);

    expect(jwksClient).toHaveBeenCalledTimes(1);
    const arg = jwksClient.mock.calls[0][0];
    expect(arg.cache).toEqual(true);
    expect(arg.rateLimit).toEqual(true);
    expect(arg.jwksRequestsPerMinute).toEqual(10);
    expect(arg.jwksUri).toEqual(expectedJwksUri);
  });

  test('does not call jwksClient when jwksUri client already exists', () => {
    jwksClientCache[expectedJwksUri] = expectedClient;

    lazyJwksClient(issuer);

    expect(jwksClient).not.toHaveBeenCalled();
  });
});

