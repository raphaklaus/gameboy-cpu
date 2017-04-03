const { Map, List } = require('immutable'),
  Rom = require('./RawReader.js');

class CPU {
  constructor() {
    this.registers = new Map({
      af: 0x01b0,
      bc: 0x13,
      de: 0xd8,
      hl: 0x14D,
      sp: 0xfffe,
      pc: 0x100,
      lcdc: 0x91,
      mbc: 0x00, // temporary address, change it!
    });

    this.flags = new Map({
      zero: '',
      subtract: '',
      halfCarry: '',
      carry: ''
    });

    this.memory = new List(new Uint8Array(0x10000));
  }

  async loadROMIntoRAM() {
    // Load first rom banks: 32kb
    // todo: control rom bank using MBC register to get the home 16kb area
    let rom = new List(await Rom.load());
    return this.memory.splice(0, 0, ...rom.filter((item, index) => index < 0x8000));
  }
}

var gameBoy = new CPU();
gameBoy.loadROMIntoRAM(gameBoy.memory).then(data => {
  console.log(data);
});
