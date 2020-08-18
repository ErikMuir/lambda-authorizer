"use strict";

const {
  LogEnv,
  LambdaLogger,
  LambdaResponse
} = require('@erikmuir/lambda-utils');

exports.handler = async function (event, context) {
  LogEnv.lambdaEvent = event;
  LogEnv.lambdaContext = context;
  const logger = new LambdaLogger('index');
  const response = new LambdaResponse();

  try {
    const body = {};
    logger.info(body);
    response.statusCode = 200;
    response.body = body;
  } catch (e) {
    logger.error(e);
    response.statusCode = 401;
    response.body = {
      error: e.message
    };
  }

  return response.build();
};
//# sourceMappingURL=index.js.map