const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const files = require('../../common/files');
const {createURI} = require('../../common/environments');
const {renderTemplate, createSpaces} = require('../../common/template');
const {getApi} = require('../../common/environments');

const exportRoutes = async (options) => {
  const spinner = createSpinner('exporting routes...');
  const api = getApi();

  try {
    spinner.start();

    const registers = [];
    const routesConfig = files.readYamlFile(createURI('/routes.yaml'));

    for (const route of Object.keys(routesConfig.routes)) {
      const {entries, imports} = routesConfig.routes[route];

      registers.push({
        what: `${route}Routes`,
        from: `./${route}.route`,
      });

      const importsLines = imports.map((imp) => renderTemplate('common.import', {
        import: imp.what,
        from: imp.from,
      })).join('\n');

      const endpointsLines = entries.map((endpoint) => renderTemplate('export.routes.route', {
        path: endpoint.path,
        method: endpoint.method,
        middlewares: endpoint.middlewares.join(`,\n${createSpaces(6)}`),
      })).join('\n');

      const routeLines = renderTemplate('export.routes.registerRoute', {
        imports: importsLines,
        endpoints: endpointsLines,
        basePath: routesConfig.basePath,
      });

      files.writeFile(`${api.routesDir}/${route}.route.js`, routeLines);
    }

    const importsLines = registers.map((imp) => renderTemplate('common.import', {
      import: imp.what,
      from: imp.from,
    })).join('\n');

    const routesLines = registers.map(({what}) => `${what}(app, tokenDecoderMiddleware);`).join('\n');

    const indexLines = renderTemplate('export.routes.main', {
      imports: importsLines,
      routes: routesLines,
    });

    files.writeFile(`${api.routesDir}/index.js`, indexLines);

    spinner.stop();
    successMessage('routes exported successfully!');
  } catch (err) {
    console.error(err);
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {exportRoutes};
