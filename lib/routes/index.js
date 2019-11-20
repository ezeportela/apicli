const jsYaml = require('js-yaml');
const files = require('../common/files');
const {createRegisterRoutesTemplate, createRoutesTemplate} = require('./templates');

module.exports = {
  generateRoutes: () => {
    const configRoutes = jsYaml.safeLoad(files.readFile('/script/routes.yaml'));
    const registers = [];

    for (const route of Object.keys(configRoutes.routes)) {
      const {entries, imports} = configRoutes.routes[route];

      registers.push({
        what: `${route}Routes`,
        from: `./${route}.route`,
      });

      const registerRoutes =
        createRegisterRoutesTemplate(
          configRoutes.basePath,
          entries,
          imports,
        );

      files.writeFile(`/src/application/routes/${route}.route.js`, registerRoutes);
    }

    files.writeFile(
      '/src/application/routes/index.js',
      createRoutesTemplate(registers),
    );
  },
};
