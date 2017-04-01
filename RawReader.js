const fs = require('bluebird').promisifyAll(require('fs'));

module.exports = class RawReader {
  static async load() {
    try {
      let file = await fs.readFileAsync('./test/roms/PokeRed.gb');
      return file
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  }
}
