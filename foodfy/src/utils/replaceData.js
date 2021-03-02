module.exports = {
  replaceData: (value) => {
    return value
      .replace(/\"/g, '')
      .replace('{', '')
      .replace('}', '')
      .split(',');
  },
};
