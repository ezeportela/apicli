module.exports = {
  createHttpServiceTemplate: (
    serviceName, {
      name,
      method,
    }
  ) => `const AbstractRestService =
  require('@common/node-base-http-services/src/abstractRestService');

class ${serviceName} extends AbstractRestService {
  getName() {
    return '${name}';
  }

  getMethod(request) {
    return '${method}';
  }
}

module.exports = ${serviceName};
`,
};