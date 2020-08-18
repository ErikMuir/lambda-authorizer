import EnvironmentWrapper from '../src/Configuration/EnvironmentWrapper';

describe('EnvironmentWrapper', () => {
  const env = new EnvironmentWrapper();

  test('issuer', () => {
    expect(env.issuer).not.toBeDefined();
    process.env = { ...process.env, ISSUER: 'foobar' };
    expect(env.issuer).toBe('foobar');
  });

  test('audience', () => {
    expect(env.audience).not.toBeDefined();
    process.env = { ...process.env, AUDIENCE: 'foobar' };
    expect(env.audience).toBe('foobar');
  });

  test('jwks', () => {
    expect(env.jwks).not.toBeDefined();
    process.env = { ...process.env, JWKS: 'foobar' };
    expect(env.jwks).toBe('foobar');
  });

  test('jwksUri', () => {
    expect(env.jwksUri).not.toBeDefined();
    process.env = { ...process.env, JWKS_URI: 'foobar' };
    expect(env.jwksUri).toBe('foobar');
  });
});
