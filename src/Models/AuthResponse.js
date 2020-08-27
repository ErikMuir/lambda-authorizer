export default class AuthResponse {
  constructor({ principalId, policyDocument } = {}) {
    this.principalId = principalId;
    this.policyDocument = policyDocument;
  }
}
