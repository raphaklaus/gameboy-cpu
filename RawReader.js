const fs = require('bluebird').promisifyAll(require('fs')),
  path = require('path');

module.exports = class RawReader {
  static async load() {
    try {
      return await fs.readFileAsync(path.join(__dirname, 'test/roms/PokeRed.gb'));
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  }
};
