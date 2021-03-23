const { LogEnv } = require('@erikmuir/lambda-utils');

module.exports = {
  get ISSUER() { return LogEnv.getEnvOrThrow('ISSUER'); },
  get AUDIENCE() { return LogEnv.getEnvOrThrow('AUDIENCE'); },
  initializeLambdaEnvironment: LogEnv.initializeLambdaEnvironment,
};
