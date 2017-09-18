const arithmetics = require('./arithmetics.js'),
  utils = require('./utils.js');

const read = (rom, memory,registers, flags) => {
  let info = {
    instructionPrint: '',
    instructionByteLength: 0,
    cycles: 0,
    leap: false
  };

  switch (rom[registers.pc]) {
    case 0x00: {
      info.instructionByteLength = 1;
      info.instructionPrint = 'NOP';
      info.cycles = 4;
      break;
    }
    case 0x01: {
      let address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
      info.instructionByteLength = 3;
      info.instructionPrint = `LD BC, ${address}`;
      info.instructionMnemonic = 'LD BC,d16';
      // todo: create some method to read and write from/to memory :)
      registers.bc = memory[parseInt(address, 16)];
      info.cycles = 12;
      break;
    }
    case 0x02: {
      let register = utils.getLowByte(registers.af);
      info.instructionByteLength = 1;
      info.instructionPrint = `LD BC, A`;
      info.instructionMnemonic = 'LD (BC), A';
      registers.bc = register;
      info.cycles = 8;
      break;
    }
    case 0x03: {
      info.instructionByteLength = 1;
      info.instructionPrint = `INC BC`;
      info.instructionMnemonic = 'INC BC';
      registers.bc++;
      info.cycles = 8;
      break;
    }
    case 0x04: {
      let register = utils.getLowByte(registers.af);
      info.instructionByteLength = 1;
      info.instructionPrint = `INC B`;
      info.instructionMnemonic = 'INC B';
      registers.b++;
      
      arithmetics.affectFlagsOnIncrement(registers.b);

      info.cycles = 4;
      break;
    }
    case 0x05: {
      let register = utils.getLowByte(registers.af);
      info.instructionByteLength = 1;
      info.instructionPrint = `DEC B`;
      info.instructionMnemonic = 'DEC B';
      
      registers.b--;

      arithmetics.affectFlagsOnDecrement(registers.b);

      info.cycles = 4;
      break;
    }
    case 0x06: {
      let address = utils.toHex(rom[registers.pc + 1]);
      info.instructionByteLength = 2;
      info.instructionPrint = `LD B, ${address}`;
      info.instructionMnemonic = 'LD B, d8';

      registers.b = parseInt(address, 16);

      info.cycles = 8;
      break;
    }
    case 0x07: {
      info.instructionByteLength = 1;
      info.instructionPrint = 'RLCA';
      info.instructionMnemonic = 'RLCA';

      let old7Bit = registers.a & 0x80;
      registers.a = rotateByteLeft(registers.a);

      arithmetics.affectFlagOnRotateLeft(registers.a, flags, old7Bit);

      info.cycles = 4;
      break;
    }
    case 0x08: {
      let address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
      info.instructionByteLength = 3;
      info.instructionPrint = `LD ${address}, SP`;
      info.instructionMnemonic = 'LD (a16),SP';

      memory[parseInt(address, 16)] = registers.sp;

      info.cycles = 20;
      break;
    }
    case 0x09: {
      // let address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
      info.instructionByteLength = 1;
      info.instructionPrint = `ADD HL, BC`;
      info.instructionMnemonic = 'ADD HL, BC';

      registers.hl += registers.bc;

      arithmetics.affectFlagOnAdd(registers.hl);

      info.cycles = 8;
      break;
    }
    case 0x0A: {
      break;
    }
    case 0x0B: {
      break;
    }
    case 0x0C: {
      break;
    }
    case 0x0D: {
      break;
    }
    case 0x0E: {
      break;
    }
    case 0x0F: {
      break;
    }
    case 0x10: {
      info.instructionByteLength = 2;
      info.instructionPrint = 'STOP';
      info.cycles = 4;
    break;
    }
    case 0x11: {
      break;
    }
    case 0x12: {
      break;
    }
    case 0x13: {
      break;
    }
    case 0x14: {
      break;
    }
    case 0x15: {
      break;
    }
    case 0x16: {
      break;
    }
    case 0x17: {
      break;
    }
    case 0x18: {
      break;
    }
    case 0x19: {
      break;
    }
    case 0x1A: {
      break;
    }
    case 0x1B: {
      break;
    }
    case 0x1C: {
      break;
    }
    case 0x1D: {
      break;
    }
    case 0x1E: {
      break;
    }
    case 0x1F: {
      break;
    }
    case 0x20: {
      break;
    }
    case 0x21: {
      break;
    }
    case 0x22: {
      break;
    }
    case 0x23: {
      break;
    }
    case 0x24: {
      break;
    }
    case 0x25: {
      break;
    }
    case 0x26: {
      break;
    }
    case 0x27: {
      break;
    }
    case 0x28: {
      break;
    }
    case 0x29: {
      break;
    }
    case 0x2A: {
      break;
    }
    case 0x2B: {
      break;
    }
    case 0x2C: {
      break;
    }
    case 0x2D: {
      break;
    }
    case 0x2E: {
      break;
    }
    case 0x2F: {
      break;
    }
    case 0x30: {
      break;
    }
    case 0x31: {
      break;
    }
    case 0x32: {
      break;
    }
    case 0x33: {
      break;
    }
    case 0x34: {
      break;
    }
    case 0x35: {
      break;
    }
    case 0x36: {
      break;
    }
    case 0x37: {
      break;
    }
    case 0x38: {
      break;
    }
    case 0x39: {
      break;
    }
    case 0x3A: {
      break;
    }
    case 0x3B: {
      break;
    }
    case 0x3C: {
      break;
    }
    case 0x3D: {
      break;
    }
    case 0x3E: {
      break;
    }
    case 0x3F: {
      break;
    }
    case 0x40: {
      break;
    }
    case 0x41: {
      break;
    }
    case 0x42: {
      break;
    }
    case 0x43: {
      break;
    }
    case 0x44: {
      break;
    }
    case 0x45: {
      break;
    }
    case 0x46: {
      break;
    }
    case 0x47: {
      break;
    }
    case 0x48: {
      break;
    }
    case 0x49: {
      break;
    }
    case 0x4A: {
      break;
    }
    case 0x4B: {
      break;
    }
    case 0x4C: {
      break;
    }
    case 0x4D: {
      break;
    }
    case 0x4E: {
      break;
    }
    case 0x4F: {
      break;
    }
    case 0x50: {
      break;
    }
    case 0x51: {
      break;
    }
    case 0x52: {
      break;
    }
    case 0x53: {
      break;
    }
    case 0x54: {
      break;
    }
    case 0x55: {
      break;
    }
    case 0x56: {
      break;
    }
    case 0x57: {
      break;
    }
    case 0x58: {
      break;
    }
    case 0x59: {
      break;
    }
    case 0x5A: {
      break;
    }
    case 0x5B: {
      break;
    }
    case 0x5C: {
      break;
    }
    case 0x5D: {
      break;
    }
    case 0x5E: {
      break;
    }
    case 0x5F: {
      break;
    }
    case 0x60: {
      break;
    }
    case 0x61: {
      break;
    }
    case 0x62: {
      break;
    }
    case 0x63: {
      break;
    }
    case 0x64: {
      break;
    }
    case 0x65: {
      break;
    }
    case 0x66: {
      break;
    }
    case 0x67: {
      break;
    }
    case 0x68: {
      break;
    }
    case 0x69: {
      break;
    }
    case 0x6A: {
      break;
    }
    case 0x6B: {
      break;
    }
    case 0x6C: {
      break;
    }
    case 0x6D: {
      break;
    }
    case 0x6E: {
      break;
    }
    case 0x6F: {
      break;
    }
    case 0x70: {
      break;
    }
    case 0x71: {
      break;
    }
    case 0x72: {
      break;
    }
    case 0x73: {
      break;
    }
    case 0x74: {
      break;
    }
    case 0x75: {
      break;
    }
    case 0x76: {
      break;
    }
    case 0x77: {
      break;
    }
    case 0x78: {
      break;
    }
    case 0x79: {
      break;
    }
    case 0x7A: {
      break;
    }
    case 0x7B: {
      break;
    }
    case 0x7C: {
      break;
    }
    case 0x7D: {
      break;
    }
    case 0x7E: {
      break;
    }
    case 0x7F: {
      break;
    }
    case 0x80: {
      break;
    }
    case 0x81: {
      break;
    }
    case 0x82: {
      break;
    }
    case 0x83: {
      break;
    }
    case 0x84: {
      break;
    }
    case 0x85: {
      break;
    }
    case 0x86: {
      break;
    }
    case 0x87: {
      break;
    }
    case 0x88: {
      break;
    }
    case 0x89: {
      break;
    }
    case 0x8A: {
      break;
    }
    case 0x8B: {
      break;
    }
    case 0x8C: {
      break;
    }
    case 0x8D: {
      break;
    }
    case 0x8E: {
      break;
    }
    case 0x8F: {
      break;
    }
    case 0x90: {
      break;
    }
    case 0x91: {
      break;
    }
    case 0x92: {
      break;
    }
    case 0x93: {
      break;
    }
    case 0x94: {
      break;
    }
    case 0x95: {
      break;
    }
    case 0x96: {
      break;
    }
    case 0x97: {
      break;
    }
    case 0x98: {
      break;
    }
    case 0x99: {
      break;
    }
    case 0x9A: {
      break;
    }
    case 0x9B: {
      break;
    }
    case 0x9C: {
      break;
    }
    case 0x9D: {
      break;
    }
    case 0x9E: {
      break;
    }
    case 0x9F: {
      break;
    }
    case 0xA0: {
      break;
    }
    case 0xA1: {
      break;
    }
    case 0xA2: {
      break;
    }
    case 0xA3: {
      break;
    }
    case 0xA4: {
      break;
    }
    case 0xA5: {
      break;
    }
    case 0xA6: {
      break;
    }
    case 0xA7: {
      break;
    }
    case 0xA8: {
      break;
    }
    case 0xA9: {
      break;
    }
    case 0xAA: {
      break;
    }
    case 0xAB: {
      break;
    }
    case 0xAC: {
      break;
    }
    case 0xAD: {
      break;
    }
    case 0xAE: {
      break;
    }
    case 0xAF: {
      info.instructionByteLength = 1;
      info.instructionPrint = `XOR A`;
      // todo: apply xor in A register, but first choose how 
      // it will be (A or AF setting high and low byte)
      info.cycles = 4;
      break;
    }
    case 0xB0: {
      break;
    }
    case 0xB1: {
      break;
    }
    case 0xB2: {
      break;
    }
    case 0xB3: {
      break;
    }
    case 0xB4: {
      break;
    }
    case 0xB5: {
      break;
    }
    case 0xB6: {
      break;
    }
    case 0xB7: {
      break;
    }
    case 0xB8: {
      break;
    }
    case 0xB9: {
      break;
    }
    case 0xBA: {
      break;
    }
    case 0xBB: {
      break;
    }
    case 0xBC: {
      break;
    }
    case 0xBD: {
      break;
    }
    case 0xBE: {
      break;
    }
    case 0xBF: {
      break;
    }
    case 0xC0: {
      break;
    }
    case 0xC1: {
      break;
    }
    case 0xC2: {
      break;
    }

    case 0xC3: {
      address = utils.toHexCompose(rom[registers.pc + 1], rom[registers.pc + 2]);
      info.instructionByteLength = 3;
      info.instructionPrint = `JP ${address}`;
      info.cycles = 16;
      info.leap = true;
      registers.pc = parseInt(address, 16);
      break;
    }

    case 0xC4: {
      break;
    }
    case 0xC5: {
      break;
    }
    case 0xC6: {
      break;
    }
    case 0xC7: {
      break;
    }
    case 0xC8: {
      break;
    }
    case 0xC9: {
      break;
    }
    case 0xCA: {
      break;
    }
    case 0xCB: {
      break;
    }
    case 0xCC: {
      break;
    }
    case 0xCD: {
      break;
    }
    case 0xCE: {
      break;
    }
    case 0xCF: {
      break;
    }
    case 0xD0: {
      break;
    }
    case 0xD1: {
      break;
    }
    case 0xD2: {
      break;
    }
    case 0xD3: {
      break;
    }
    case 0xD4: {
      break;
    }
    case 0xD5: {
      break;
    }
    case 0xD6: {
      break;
    }
    case 0xD7: {
      break;
    }
    case 0xD8: {
      break;
    }
    case 0xD9: {
      break;
    }
    case 0xDA: {
      break;
    }
    case 0xDB: {
      break;
    }
    case 0xDC: {
      break;
    }
    case 0xDD: {
      break;
    }
    case 0xDE: {
      break;
    }
    case 0xDF: {
      break;
    }
    case 0xE0: {
      break;
    }
    case 0xE1: {
      break;
    }
    case 0xE2: {
      break;
    }
    case 0xE3: {
      break;
    }
    case 0xE4: {
      break;
    }
    case 0xE5: {
      break;
    }
    case 0xE6: {
      break;
    }
    case 0xE7: {
      break;
    }
    case 0xE8: {
      break;
    }
    case 0xE9: {
      break;
    }
    case 0xEA: {
      break;
    }
    case 0xEB: {
      break;
    }
    case 0xEC: {
      break;
    }
    case 0xED: {
      break;
    }
    case 0xEE: {
      break;
    }
    case 0xEF: {
      break;
    }
    case 0xF0: {
      break;
    }
    case 0xF1: {
      break;
    }
    case 0xF2: {
      break;
    }
    case 0xF3: {
      break;
    }
    case 0xF4: {
      break;
    }
    case 0xF5: {
      break;
    }
    case 0xF6: {
      break;
    }
    case 0xF7: {
      break;
    }
    case 0xF8: {
      break;
    }
    case 0xF9: {
      break;
    }
    case 0xFA: {
      break;
    }
    case 0xFB: {
      break;
    }
    case 0xFC: {
      break;
    }
    case 0xFD: {
      break;
    }
    case 0xFE: {
      break;
    }
    case 0xFF: {
      break;
    }
    default: {
      info.instructionPrint = `OPCODE ${utils.toHex(rom[registers.pc])} NOT IMPLEMENTED YET`;
      break;
    }
  }

  info.instructionPrint += '\n';
  return info;
};

module.exports = { read };
