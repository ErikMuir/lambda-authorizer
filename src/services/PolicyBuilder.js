const { PrimitiveMap } = require('@erikmuir/node-utils');
const PolicyBuilderException = require('../exceptions/PolicyBuilderException');
const ApiGatewayArn = require('../models/ApiGatewayArn');
const Effect = require('../models/Effect');
const HttpVerb = require('../models/HttpVerb');
const PolicyDocument = require('../models/PolicyDocument');
const PolicyStatement = require('../models/PolicyStatement');

const _resourcePattern = new RegExp('^[/.a-zA-Z0-9-\\*]+$');
const _allowedEffects = [Effect.allow, Effect.deny];
const _allowedVerbs = [
  HttpVerb.get,
  HttpVerb.post,
  HttpVerb.put,
  HttpVerb.patch,
  HttpVerb.head,
  HttpVerb.delete,
  HttpVerb.options,
  HttpVerb.all,
];

module.exports = class PolicyBuilder {
  constructor() {
    this._apiGatewayArn = null;
    this._principalId = null;
    this._usageIdentifierKey = null;
    this._allowMethodArns = [];
    this._denyMethodArns = [];
    this._statements = [];
    this._context = new PrimitiveMap();
  }

  get apiGatewayArn() {
    return this._apiGatewayArn;
  }

  set apiGatewayArn(val) {
    if (!(val instanceof ApiGatewayArn)) {
      throw new PolicyBuilderException('The apiGatewayArn must be an instance of ApiGatewayArn.');
    }
    this._apiGatewayArn = val;
  }

  get principalId() {
    return this._principalId;
  }

  set principalId(val) {
    if (typeof val !== 'string') {
      throw new PolicyBuilderException('The principalId must be a string.');
    }
    this._principalId = val;
  }

  get usageIdentifierKey() {
    return this._usageIdentifierKey;
  }

  set usageIdentifierKey(val) {
    if (typeof val !== 'string') {
      throw new PolicyBuilderException('The usageIdentifierKey must be a string.');
    }
    this._usageIdentifierKey = val;
  }

  get allowMethodArns() {
    return this._allowMethodArns;
  }

  set allowMethodArns(val) {
    throw new PolicyBuilderException('allowMethodArns cannot be set directly.');
  }

  get denyMethodArns() {
    return this._denyMethodArns;
  }

  set denyMethodArns(val) {
    throw new PolicyBuilderException('denyMethodArns cannot be set directly.');
  }

  get statements() {
    return this._statements;
  }

  set statements(val) {
    throw new PolicyBuilderException('statements cannot be set directly.');
  }

  get context() {
    return this._context;
  }

  set context(val) {
    throw new PolicyBuilderException('context cannot be set directly.');
  }

  allowMethod(verb, resource) {
    this.addMethod(Effect.allow, verb, resource);
  }

  denyMethod(verb, resource) {
    this.addMethod(Effect.deny, verb, resource);
  }

  allowAllMethods() {
    this.addMethod(Effect.allow, HttpVerb.all, '*');
  }

  denyAllMethods() {
    this.addMethod(Effect.deny, HttpVerb.all, '*');
  }

  addMethod(effect, verb, resource) {
    this._validateMethod(effect, verb, resource);

    const cleanedResource = resource.startsWith('/') ? resource.substring(1) : resource;
    const arn = new ApiGatewayArn({ verb, resource: cleanedResource });

    switch (effect) {
      case Effect.deny:
        this._denyMethodArns.push(arn);
        break;
      case Effect.allow:
        this._allowMethodArns.push(arn);
        break;
    }
  }

  build() {
    this._populateStatements();

    return {
      principalId: this._principalId,
      policyDocument: new PolicyDocument(this._statements),
      context: this._context.toObject(),
      usageIdentifierKey: this._usageIdentifierKey,
    };
  }

  _validateMethod(effect, verb, resource) {
    const errors = [];

    if (!effect) {
      errors.push('"effect" is required.');
    } else if (!_allowedEffects.includes(effect)) {
      errors.push('Invalid effect.');
    }

    if (!verb) {
      errors.push('"verb" is required.');
    } else if (!_allowedVerbs.includes(verb)) {
      errors.push('Invalid verb.');
    }

    if (!resource) {
      errors.push('"resource" is required.');
    } else if (!_resourcePattern.test(resource)) {
      errors.push('Invalid resource.');
    }

    if (errors.length > 0) {
      throw new PolicyBuilderException(errors.join(' '));
    }
  }

  _populateStatements(effect) {
    if (!this._apiGatewayArn) return;

    if (!effect) {
      this._populateStatements(Effect.deny); // recursion!
      this._populateStatements(Effect.allow); // recursion!
    } else {
      this._getArns(effect).forEach(arn => {
        arn.partition = this._apiGatewayArn.partition;
        arn.service = this._apiGatewayArn.service;
        arn.region = this._apiGatewayArn.region || '*';
        arn.awsAccountId = this._apiGatewayArn.awsAccountId;
        arn.restApiId = this._apiGatewayArn.restApiId || '*';
        arn.stage = this._apiGatewayArn.stage || '*';

        this._statements.push(new PolicyStatement({ effect, arn }));
      });
    }
  }

  _getArns(effect) {
    switch (effect) {
      case Effect.deny:
        return this._denyMethodArns;
      case Effect.allow:
        return this._allowMethodArns;
    }
  }
}
