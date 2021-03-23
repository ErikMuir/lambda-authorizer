const invokeApiAction = 'execute-api:Invoke';

module.exports = class PolicyStatement {
  constructor({ effect, arn } = {}) {
    this.Effect = effect;
    this.Resource = arn ? [ arn.toString() ] : [];
    this.Action = [ invokeApiAction ];
  }
}
