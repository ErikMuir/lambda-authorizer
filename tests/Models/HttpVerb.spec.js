import HttpVerb from '../../src/Models/HttpVerb';
import * as utils from '../utils';

describe('HttpVerb', () => {
  describe('get', () => {
    test('returns GET', () => {
      expect(HttpVerb.get).toBe('GET');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.get = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property get');
    });
  });
  
  describe('post', () => {
    test('returns POST', () => {
      expect(HttpVerb.post).toBe('POST');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.post = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property post');
    });
  });
  
  describe('put', () => {
    test('returns PUT', () => {
      expect(HttpVerb.put).toBe('PUT');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.put = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property put');
    });
  });
  
  describe('patch', () => {
    test('returns PATCH', () => {
      expect(HttpVerb.patch).toBe('PATCH');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.patch = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property patch');
    });
  });
  
  describe('head', () => {
    test('returns HEAD', () => {
      expect(HttpVerb.head).toBe('HEAD');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.head = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property head');
    });
  });
  
  describe('delete', () => {
    test('returns DELETE', () => {
      expect(HttpVerb.delete).toBe('DELETE');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.delete = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property delete');
    });
  });
  
  describe('options', () => {
    test('returns OPTIONS', () => {
      expect(HttpVerb.options).toBe('OPTIONS');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.options = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property options');
    });
  });
  
  describe('all', () => {
    test('returns *', () => {
      expect(HttpVerb.all).toBe('*');
    });

    test('cannot be set', () => {
      const error = utils.recordError(() => {
        HttpVerb.all = 'foobar';
      });

      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toContain('Cannot set property all');
    });
  });
});
