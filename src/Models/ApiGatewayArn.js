import ApiGatewayArnException from '../Exceptions/ApiGatewayArnException';

export default class ApiGatewayArn {
  constructor(object = {}) {
    const {
      partition,
      service,
      region,
      awsAccountId,
      restApiId,
      stage,
      verb,
      resource,
    } = object;

    this.partition = partition;
    this.service = service;
    this.region = region;
    this.awsAccountId = awsAccountId;
    this.restApiId = restApiId;
    this.stage = stage;
    this.verb = verb;
    this.resource = resource;
  }

  static parse(value) {
    try {
      const arnSplit = value.split(':');
      const pathSplit = arnSplit[5].split('/');

      const object = {
        partition: arnSplit[1],
        service: arnSplit[2],
        region: arnSplit[3],
        awsAccountId: arnSplit[4],
        restApiId: pathSplit[0],
        stage: pathSplit[1],
        verb: pathSplit[2],
        resource: pathSplit.length > 3 ? pathSplit.slice(3).join('/') : '',
      };

      return new this(object);
    } catch {
      throw new ApiGatewayArnException(`Invalid API Gateway ARN: '${value}'`);
    }
  }

  toString() {
    return `arn:${this.partition}:${this.service}:${this.region}:${this.awsAccountId}:${this.restApiId}/${this.stage}/${this.verb}/${this.resource}`;
  }
}
