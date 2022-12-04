const path = require('node:path');

const getYear = (dirPath) => {
    const { base } = path.parse(dirPath);
    
    return base;
};

const getDay = (filePath) => {
    const { name } = path.parse(filePath);

    return name.slice(-2);
};

module.exports = {
    getYear,
    getDay,
}