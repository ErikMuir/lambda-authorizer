import EnvironmentWrapper from '../src/Configuration/EnvironmentWrapper';

describe('EnvironmentWrapper', () => {
  const env = new EnvironmentWrapper();

  test('issuer', () => {
    process.env = { ...process.env, ISSUER: 'foobar-issuer' };

    expect(env.issuer).toBe('foobar-issuer');
  });

  test('audience', () => {
    process.env = { ...process.env, AUDIENCE: 'foobar-audience' };

    expect(env.audience).toBe('foobar-audience');
  });

  test('jwks', () => {
    process.env = { ...process.env, JWKS: 'foobar-jwks' };

    expect(env.jwks).toBe('foobar-jwks');
  });

  test('jwksUri', () => {
    process.env = { ...process.env, JWKS_URI: 'foobar-jwks-uri' };
    
    expect(env.jwksUri).toBe('foobar-jwks-uri');
  });
});
