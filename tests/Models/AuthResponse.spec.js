import AuthResponse from '../../src/Models/AuthResponse';
import PolicyDocument from '../../src/Models/PolicyDocument';

describe('AuthResponse', () => {
  describe('constructor', () => {
    test('sets principalId', () => {
      const principalId = 'principal-id';

      const actual = new AuthResponse({ principalId });

      expect(actual.principalId).toBe(principalId);
    });

    test('sets policyDocument', () => {
      const policyDocument = new PolicyDocument();
      
      const actual = new AuthResponse({ policyDocument });

      expect(actual.policyDocument).toBe(policyDocument);
    });
    
    test('does not blow up when nothing provided', () => {
      const actual = new AuthResponse();

      expect(actual).toBeDefined();
      expect(actual.principalId).not.toBeDefined();
      expect(actual.policyDocument).not.toBeDefined();
    });
  });
});
