const { readFile } = require('./lib/common/files');

const test = async () => {
    const file = await readFile('/config/default.js');

    const regexr = file.match(/(.*getServiceConfig\()([\s\S]*)(}\),)/gmi);
    console.log(regexr);
};

test();