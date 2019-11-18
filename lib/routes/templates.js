const createSpaces = (count) => ' '.repeat(count);
const createRouteTemplate = ({
  path,
  method,
  middlewares,
}) => `router
    .route('${path}')
    .${method}(
      tokenDecoderMiddleware,
      ${middlewares.join(`,\n${createSpaces(6)}`)}
    )
    .all(methodNotAllowed);`;

const createImportTemplate = ({what, from}) => `const ${what} = require('${from}');`;

exports.createRegisterRoutesTemplate = (basePath, endpoints, imports) => `const express = require('express');
${imports.map((data) => createImportTemplate(data)).join('\n')}
const methodNotAllowed =
  require('@common/node-security').methodNotAllowedHandler;

const registerRoutes = (app, tokenDecoderMiddleware) => {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  ${endpoints.map((endpoint) => createRouteTemplate(endpoint)).join('\n')}

  app.use('${basePath}', router);

  return app;
};

module.exports = registerRoutes;
`;

exports.createRoutesTemplate = (registers) => `const express = require('express');
const logger = require('@common/node-logger/src/logger');
const tokenDecoderMiddleware = require('@common/token-decoder')({logger});

const app = express();

${registers.map((data) => createImportTemplate(data)).join('\n')}

${registers.map(({what}) => `${what}(app, tokenDecoderMiddleware);`).join('\n')}

module.exports = app;
`;

