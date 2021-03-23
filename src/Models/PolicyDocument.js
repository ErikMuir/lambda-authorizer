const version = '2012-10-17';

module.exports = class PolicyDocument {
  constructor(statements) {
    this.Version = version;
    this.Statement = statements || [];
  }
}
