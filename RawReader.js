const fs = require('bluebird').promisifyAll(require('fs'));

class RawReader {
  static async load() {
    try {
      let file = await fs.readFileAsync('./test/roms/PokeRed.gb');
      console.log(file);
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  }
}

RawReader.load();
