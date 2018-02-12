const fs = require('bluebird').promisifyAll(require('fs')),
  path = require('path');

module.exports = class RawReader {
  static async load(romPath) {
    try {
      return await fs.readFileAsync(path.join(__dirname, romPath));
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  }
};
