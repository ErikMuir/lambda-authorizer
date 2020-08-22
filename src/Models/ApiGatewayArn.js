import ApiGatewayArnException from '../Exceptions/ApiGatewayArnException';

export default class ApiGatewayArn {
  constructor(value) {
    this.partition = null;
    this.service = null;
    this.region = null;
    this.awsAccountId = null;
    this.restApiId = null;
    this.stage = null;
    this.verb = null;
    this.resource = null;

    this._parse(value);
  }

  _parse(value) {
    try {
        const arnSplit = value.split(':');
        this.partition = arnSplit[1];
        this.service = arnSplit[2];
        this.region = arnSplit[3];
        this.awsAccountId = arnSplit[4];

        const pathSplit = arnSplit[5].split('/');
        this.restApiId = pathSplit[0];
        this.stage = pathSplit[1];
        this.verb = pathSplit[2];

        if (pathSplit.length > 3)
        {
            this.resource = pathSplit.slice(3).join('/');
        }
    } catch {
        throw new ApiGatewayArnException(`Invalid method arn: '${value}'`);
    }
  }

  toString() {
    return `arn:${this.partition}:${this.service}:${this.region}:${this.awsAccountId}:${this.restApiId}/${this.stage}/${this.verb}/${this.resource}`;
  }
}
