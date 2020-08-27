const version = '2012-10-17';

export default class PolicyDocument {
  constructor(statements) {
    this.Version = version;
    this.Statement = statements || [];
  }
}
