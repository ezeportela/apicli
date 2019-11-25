const files = require('./files');

const renderTemplate = (templateName, params) => {
  const path = templateName.replace(/\./g, '/');
  let template = files.readRelativeFile(`../templates/${path}.t`);

  for (const param of Object.keys(params)) {
    const value = params[param];

    template = template.replace(new RegExp(`{{${param}}}`, 'g'), value);
  }

  return template;
};

module.exports = {renderTemplate};
