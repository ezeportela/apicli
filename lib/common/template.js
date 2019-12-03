const files = require('./files');
const {getConfig} = require('./environments');

const createSpaces = (count) => ' '.repeat(count);

const renderTemplate = (templateName, params = {}) => {
  const path = templateName.replace(/\./g, '/');
  const config = getConfig();
  let template = files.readRelativeFile(`../templates/${path}.${config.template_ext}`);

  for (const param of Object.keys(params)) {
    const value = params[param];

    template = template.replace(new RegExp(`{{${param}}}`, 'g'), value);
  }

  return template;
};

module.exports = {
  createSpaces,
  renderTemplate,
};
