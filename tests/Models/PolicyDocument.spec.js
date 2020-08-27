import PolicyDocument from '../../src/Models/PolicyDocument';

describe('PolicyDocument', () => {
  describe('constructor', () => {
    test('sets Version', () => {
      const expectedVersion = '2012-10-17';

      const actual = new PolicyDocument();

      expect(actual.Version).toBe(expectedVersion);
    });

    test('sets Statement when provided', () => {
      const statements = ['foo', 'bar', 'baz'];

      const actual = new PolicyDocument(statements);
      
      expect(actual.Statement).toBe(statements);
    });

    test('defaults Statement to empty list when not provided', () => {
      const actual = new PolicyDocument();

      expect(actual.Statement).toBeDefined();
      expect(actual.Statement.length).toBe(0);
    });
  });
});
