const utils = require('./utils');

const read = (rom, memory,registers, flags) => {
  let info = {
    instructionPrint: '',
    instructionByteLength: 0,
    cycles: 0,
    leap: false
  };

  let address;

  switch (rom[registers.pc]) {
  case 0x00:
    info.instructionByteLength = 1;
    info.instructionPrint = 'NOP';
    info.cycles = 4;
    break;
  case 0x01:
    address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
    info.instructionByteLength = 3;
    info.instructionPrint = `LD BC ${address}`;
    // todo: create some method to read and write from/to memory :)
    registers.bc = memory[parseInt(address, 16)];
    info.cycles = 12;
    break;
  case 0x02:
    break;
  case 0x03:
    break;
  case 0x04:
    break;
  case 0x05:
    break;
  case 0x06:
    break;
  case 0x07:
    break;
  case 0x08:
    break;
  case 0x09:
    break;
  case 0x0a:
    break;
  case 0x0b:
    break;
  case 0x0c:
    break;
  case 0x0d:
    break;
  case 0x0e:
    break;
  case 0x0f:
    break;
  case 0x10:
      info.instructionByteLength = 2;
      info.instructionPrint = 'STOP';
      info.cycles = 4;
    break;
  case 0xC3:
    address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
    info.instructionByteLength = 3;
    info.instructionPrint = `JP ${address}`;
    info.cycles = 16;
    info.leap = true;
    registers.pc = parseInt(address, 16);
    break;

  // Out of order! Just for testing
  case 0xAF:
      info.instructionByteLength = 1;
      info.instructionPrint = `XOR A`;
      // todo: apply xor in A register, but first choose how 
      // it will be (A or AF setting high and low byte)
      info.cycles = 4;
    break;
  default:
    info.instructionPrint = `OPCODE ${utils.toHex(rom[registers.pc])} NOT IMPLEMENTED YET`;
    break;
  }

  info.instructionPrint += '\n';
  return info;
};

module.exports = { read };
