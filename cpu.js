const Rom = require('./RawReader.js'),
  opcodes = require('./opcodes');

class CPU {
  constructor() {
    this.registers = {
      af: 0x01b0,
      bc: 0x13,
      de: 0xd8,
      hl: 0x14D,
      sp: 0xfffe,
      pc: 0x0, // default to 0x100
      lcdc: 0x91,
      mbc: 0x00, // temporary address, change it!
    };

    this.flags = {
      zero: '',
      subtract: '',
      halfCarry: '',
      carry: ''
    };

    this.memory = new Uint8Array(0x10000);
  }

  async loadROM() {
    // Load first rom banks: 32kb
    // todo: control rom bank using MBC register to get the home 16kb area
    let rom = new Uint8Array(await Rom.load());
    console.log('length', rom.length);
    // var bytes = [];

    // for (var index = 0; index < 4; index++) {
    //   opcodes.read(rom[index]);
    // }

    while (this.registers.pc < 0xa) {
      let info = opcodes.read(rom, this.registers, this.flags);
      console.log(info.instructionPrint);
      this.registers.pc += info.instructionByteLength;
    }

    // rom.forEach(byte => {
    //   bytes.push(byte);
    // });

    // opcodes.read(bytes[1]);

    //return this.memory.splice(0, 0, ...rom.filter((item, index) => index < 0x8000));
  }

  enableMBC(romLength) {
    return romLength > 32768;
  }
}

var gameBoy = new CPU();
gameBoy.loadROM(gameBoy.memory).then(data => {
  console.log(data);
});
