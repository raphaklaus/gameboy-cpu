const rom = require('./RawReader.js');

class CPU {
  constructor() {
    this.registers = {
      af: 0x01b0,
      bc: 0x13,
      de: 0xd8,
      hl: 0x14D,
      sp: 0xfffe,
      pc: 0x100
    };

    this.flags = {
      zero: '',
      subtract: '',
      halfCarry: '',
      carry: ''
    };

    this.memory = new Uint8Array(0x10000);

    rom.load();
  }
}

var gameBoy = new CPU();
