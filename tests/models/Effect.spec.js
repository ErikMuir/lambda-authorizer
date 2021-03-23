const Effect = require('../../src/models/Effect');
const { testUtils } = require('@erikmuir/node-utils');

describe('Effect', () => {
  describe('allow', () => {
    test('getter returns Allow', () => {
      expect(Effect.allow).toBe('Allow');
    });

    test('setter throws', () => {
      const action = () => (Effect.allow = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property allow');
      };

      testUtils.expectError(action, assertions);
    });
  });

  describe('deny', () => {
    test('getter returns Deny', () => {
      expect(Effect.deny).toBe('Deny');
    });

    test('setter throws', () => {
      const action = () => (Effect.deny = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property deny');
      };

      testUtils.expectError(action, assertions);
    });
  });
});
