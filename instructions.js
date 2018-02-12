const CPUCore = require('./cpuCore.js'),
  byteLength = require('./tables.js').byteLength,
  memory = require('./memory.js'),
  cycles = require('./tables.js').cycles,
  utils = require('./utils.js');

const updateByteLengthAndCycles = (info, opCodeNo) => {
  info.instructionByteLength = byteLength[opCodeNo];
  info.cycles = cycles[opCodeNo];
};

const nop = (info, opCodeNo) => {
  info.instructionPrint += 'NOP';
  updateByteLengthAndCycles(info, opCodeNo);
};

const load16BitDataTo16BitRegister = (info, register, address, opCodeNo) => {
  info.instructionPrint += `LD ${register}, ${address}`;
  info.instructionMnemonic = 'LD r16, d16';

  CPUCore.registers[register].value = parseInt(address, 16);

  updateByteLengthAndCycles(info, opCodeNo);
};

const load8BitRegisterTo8BitRegister = (info, registers, opCodeNo) => {
  info.instructionPrint += `LD ${registers[0]}, ${registers[1]}`;
  info.instructionMnemonic = 'LD r8, r8';

  CPUCore.registers[registers[0]].value = CPUCore.registers[registers[1]].value;

  updateByteLengthAndCycles(info, opCodeNo);
};

const load16BitPointerTo8BitRegister = (info, registers, opCodeNo) => {
  let sourceRegister = utils.translate8BitTo16BitRegister(registers[0]);

  info.instructionPrint += `LD ${sourceRegister.name}, ${registers[1]}`;
  info.instructionMnemonic = 'LD r8, (r16)';

  CPUCore.registers[sourceRegister.composition][sourceRegister.function] = memory[parseInt(CPUCore.registers[registers[1]].value, 16)];

  updateByteLengthAndCycles(info, opCodeNo);
};


module.exports = { nop, load16BitDataTo16BitRegister, load8BitRegisterTo8BitRegister,
  load16BitPointerTo8BitRegister };
