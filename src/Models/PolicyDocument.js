const _version = '2012-10-17';

export default class PolicyDocument {
  constructor(statements) {
    this.Version = _version;
    this.Statement = statements || [];
  }
}
