export default class EnvironmentWrapper {
  get issuer() { return process.env.ISSUER; }
  get audience() { return process.env.AUDIENCE; }
  get jwks() { return process.env.JWKS; }
  get jwksUri() { return process.env.JWKS_URI; }
}
