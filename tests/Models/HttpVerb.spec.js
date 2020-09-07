import HttpVerb from '../../src/Models/HttpVerb';
import { expectError } from '@erikmuir/node-utils';

describe('HttpVerb', () => {
  describe('get', () => {
    test('getter returns GET', () => {
      expect(HttpVerb.get).toBe('GET');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.get = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property get');
      };

      expectError(action, assertions);
    });
  });

  describe('post', () => {
    test('getter returns POST', () => {
      expect(HttpVerb.post).toBe('POST');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.post = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property post');
      };

      expectError(action, assertions);
    });
  });

  describe('put', () => {
    test('getter returns PUT', () => {
      expect(HttpVerb.put).toBe('PUT');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.put = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property put');
      };

      expectError(action, assertions);
    });
  });

  describe('patch', () => {
    test('getter returns PATCH', () => {
      expect(HttpVerb.patch).toBe('PATCH');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.patch = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property patch');
      };

      expectError(action, assertions);
    });
  });

  describe('head', () => {
    test('getter returns HEAD', () => {
      expect(HttpVerb.head).toBe('HEAD');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.head = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property head');
      };

      expectError(action, assertions);
    });
  });

  describe('delete', () => {
    test('getter returns DELETE', () => {
      expect(HttpVerb.delete).toBe('DELETE');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.delete = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property delete');
      };

      expectError(action, assertions);
    });
  });

  describe('options', () => {
    test('getter returns OPTIONS', () => {
      expect(HttpVerb.options).toBe('OPTIONS');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.options = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property options');
      };

      expectError(action, assertions);
    });
  });

  describe('all', () => {
    test('getter returns *', () => {
      expect(HttpVerb.all).toBe('*');
    });

    test('setter throws', () => {
      const action = () => (HttpVerb.all = 'foobar');
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toContain('Cannot set property all');
      };

      expectError(action, assertions);
    });
  });
});
