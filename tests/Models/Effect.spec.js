import Effect from '../../src/Models/Effect';
import * as utils from '../utils';

describe('Effect', () => {
  describe('allow', () => {
    test('returns Allow', () => {
      expect(Effect.allow).toBe('Allow');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        Effect.allow = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property allow');
    });
  });

  describe('deny', () => {
    test('returns Deny', () => {
      expect(Effect.deny).toBe('Deny');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        Effect.deny = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property deny');
    });
  });
});
