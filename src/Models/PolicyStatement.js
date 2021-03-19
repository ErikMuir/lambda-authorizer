const invokeApiAction = 'execute-api:Invoke';

export default class PolicyStatement {
  constructor({ effect, arn } = {}) {
    this.Effect = effect;
    this.Resource = arn ? [ arn.toString() ] : [];
    this.Action = [ invokeApiAction ];
  }
}
