const envWrapper = require('../../src/Configuration/EnvironmentWrapper');

describe('EnvironmentWrapper', () => {
  describe('environment variables', () => {
    let originalEnv;

    beforeAll(() => {
      originalEnv = { ...process.env };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    [
      'ISSUER',
      'AUDIENCE',
    ].forEach(envVar => {
      test(`${envVar} returns value when set`, () => {
        const expectedValue = 'foobar';

        process.env = { ...process.env, [envVar]: expectedValue };

        expect(envWrapper[envVar]).toBe(expectedValue);
      });

      test(`${envVar} throws when not set`, () => {
        const expectedError = `Environment variable: ${envVar} not set.`;

        expect(() => envWrapper[envVar]).toThrow(expectedError);
      });
    });
  });
});
