const arithmetics = require('./arithmetics.js'),
  utils = require('./utils.js'),
  byteLength = require('./tables.js').byteLength,
  cycles = require('./tables.js').cycles;
  instructions = require('./instructions.js');

var CPUCore = require('./cpuCore.js'),
  memory = require('./memory.js');
  //flags = require('./flags.js');

const read = (rom) => {
  let info = {
    instructionPrint: `#${utils.toHex(CPUCore.registers.PC.value)}: `,
    instructionByteLength: 0,
    cycles: 0,
    leap: false
  };
 
  var opCodeNo = rom[CPUCore.registers.PC.value];

  switch (opCodeNo) {
    case 0x00: {
      instructions.nop(info, opCodeNo);
      break;
    }
    case 0x01: {
      let address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      instructions.load16BitDataTo16BitRegister(info, 'BC', address, opCodeNo);
      break;
    }
    case 0x02: {
      let address = CPUCore.registers.BC;
      let register = utils.getLowByte(CPUCore.registers.af);
      info.instructionPrint += 'LD (BC), A';
      info.instructionMnemonic = 'LD (BC), A';

      memory[parseInt(address, 16)] = register;

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];      
      break;
    }
    case 0x03: {
      info.instructionPrint += 'INC BC';
      info.instructionMnemonic = 'INC BC';
      CPUCore.registers.BC.value++;
      
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x04: {
      let register = utils.getLowByte(CPUCore.registers.af);
      info.instructionPrint += 'INC B';
      info.instructionMnemonic = 'INC B';
      CPUCore.registers.BC.value++;
      
      arithmetics.affectFlagsOnIncrement(CPUCore.registers.BC);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x05: {
      let register = utils.getLowByte(CPUCore.registers.af);
      info.instructionPrint += 'DEC B';
      info.instructionMnemonic = 'DEC B';
      
      CPUCore.registers.BC.value--;

      arithmetics.affectFlagsOnDecrement(CPUCore.registers.BC);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x06: {
      let address = utils.toHex(rom[CPUCore.registers.PC.value + 1]);
      info.instructionPrint += `LD B, ${address}`;
      info.instructionMnemonic = 'LD B, d8';

      CPUCore.registers.BC.High = address;

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x07: {
      info.instructionPrint += 'RLCA';
      info.instructionMnemonic = 'RLCA';

      let old7Bit = CPUCore.registers.AF.High & 0x80;
      CPUCore.registers.AF.High = rotateByteLeft(CPUCore.registers.AF.High);

      arithmetics.affectFlagOnRotateLeft(CPUCore.registers.AF.High, flags, old7Bit);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x08: {
      let address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      info.instructionPrint += `LD ${address}, SP`;
      info.instructionMnemonic = 'LD (a16), SP';

      memory[parseInt(address, 16)] = CPUCore.registers.SP.value;

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x09: {
      info.instructionPrint += `ADD HL, BC`;
      info.instructionMnemonic = 'ADD HL, BC';

      CPUCore.registers.HL.value += CPUCore.registers.BC.value;

      arithmetics.affectFlagOnAdd(CPUCore.registers.HL.value);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x0A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x0B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x0C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x0D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x0E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x0F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x10: {
      info.instructionPrint += 'STOP';
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];

      // todo: Halt CPU and LCD until button pressed
    break;
    }
    case 0x11: {
      let address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      instructions.load16BitDataTo16BitRegister(info, 'DE', address, opCodeNo);
      break;
    }
    case 0x12: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x13: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x14: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x15: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x16: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x17: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x18: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x19: {
      info.instructionPrint += `ADD HL, DE`;
      info.instructionMnemonic = 'ADD HL, DE';

      CPUCore.registers.hl += CPUCore.registers.de;

      arithmetics.affectFlagOnAdd(CPUCore.registers.hl);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x1A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x1B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x1C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x1D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x1E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x1F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x20: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x21: {
      let address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      instructions.load16BitDataTo16BitRegister(info, 'HL', address, opCodeNo);
      break;
    }
    case 0x22: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x23: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x24: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x25: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x26: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x27: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x28: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x29: {
      info.instructionPrint += `ADD HL, HL`;
      info.instructionMnemonic = 'ADD HL, HL';

      CPUCore.registers.hl += CPUCore.registers.hl;

      arithmetics.affectFlagOnAdd(CPUCore.registers.hl);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x2A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x2B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x2C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x2D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x2E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x2F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x30: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x31: {
      let address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      instructions.load16BitDataTo16BitRegister(info, 'SP', address, opCodeNo);
      break;
    }
    case 0x32: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x33: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x34: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x35: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x36: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x37: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x38: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x39: {
      info.instructionPrint += `ADD HL, SP`;
      info.instructionMnemonic = 'ADD HL, SP';

      CPUCore.registers.hl += CPUCore.registers.sp;

      arithmetics.affectFlagOnAdd(CPUCore.registers.hl);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0x3A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x3B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x3C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x3D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x3E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x3F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x40: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x41: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x42: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x43: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x44: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x45: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x46: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x47: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x48: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x49: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x4F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x50: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x51: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x52: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x53: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x54: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x55: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x56: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x57: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x58: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x59: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x5F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x60: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x61: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x62: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x63: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x64: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x65: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x66: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x67: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x68: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x69: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x6F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x70: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x71: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x72: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x73: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x74: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x75: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x76: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x77: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x78: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'B'], opCodeNo);
      break;
    }
    case 0x79: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'C'], opCodeNo);
      break;
    }
    case 0x7A: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'D'], opCodeNo);
      break;
    }
    case 0x7B: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'E'], opCodeNo);
      break;
    }
    case 0x7C: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'H'], opCodeNo);
      break;
    }
    case 0x7D: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'L'], opCodeNo);
      break;
    }
    case 0x7E: {
      instructions.load16BitPointerTo8BitRegister(info, ['A', 'HL'], opCodeNo);
      break;
    }
    case 0x7F: {
      instructions.load8BitRegisterTo8BitRegister(info, ['A', 'A'], opCodeNo);
      break;
    }
    case 0x80: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x81: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x82: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x83: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x84: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x85: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x86: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x87: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x88: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x89: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x8F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x90: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x91: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x92: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x93: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x94: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x95: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x96: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x97: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x98: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x99: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9A: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9B: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9C: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9D: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9E: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0x9F: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA3: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xA9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAD: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xAF: {
      info.instructionPrint += `XOR A`;
      // todo: apply xor in A register, but first choose how 
      // it will be (A or AF setting high and low byte)
      //console.log('byte length', byteLength[rom[CPUCore.registers.PC.value]]);
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0xB0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB3: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xB9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBD: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xBF: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC3: {
      address = utils.toHexCompose(rom[CPUCore.registers.PC.value + 1], rom[CPUCore.registers.PC.value + 2]);
      info.instructionPrint += `JP ${address}`;
      info.leap = true;
      CPUCore.registers.PC.value = parseInt(address, 16);

      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      break;
    }
    case 0xC4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xC9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCD: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xCF: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD3: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xD9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDD: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xDF: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE3: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xE9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xEA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xEB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xEC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xED: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xEE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xEF: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF0: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF1: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF2: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF3: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF4: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF5: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF6: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF7: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF8: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xF9: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFA: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFB: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFC: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFD: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFE: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    case 0xFF: {
      info.instructionByteLength = byteLength[rom[CPUCore.registers.PC.value]];
      info.cycles = cycles[rom[CPUCore.registers.PC.value]];
      info.instructionPrint += 'No code for opcode... Jumping';
      break;
    }
    default: {
      info.instructionPrint += `OPCODE ${utils.toHex(rom[CPUCore.registers.PC.value])} NOT IMPLEMENTED YET`;
      break;
    }
  }

  info.instructionPrint += '\n';
  return info;
};

module.exports = { read };
