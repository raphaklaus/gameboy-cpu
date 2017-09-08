const utils = require('./utils');

const read = (rom, registers, flags) => {
  let info = {
    instructionPrint: '',
    instructionByteLength: 0,
    cycles: 0
  };

  switch (rom[registers.pc]) {
  case 0x0:
    info.instructionByteLength = 1;
    info.instructionPrint = 'NOP';
    info.cycles = 4;
    break;
  case 0xc3:
    info.instructionByteLength = 3;
    info.instructionPrint = `JP ${utils.toHex(rom[registers.pc + 1])} ${utils.toHex(rom[registers.pc + 2])}`;
    info.cycles = 12;
    break;
  default:
    info.instructionPrint = 'NOT IMPLEMENTED YET';
    break;
  }

  info.instructionPrint += '\n';
  return info;
};

module.exports = { read };
