const CPUCore = require('./cpuCore.js'),
  byteLength = require('./tables.js').byteLength,
  memory = require('./memory.js'),
  cycles = require('./tables.js').cycles;
    
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
  info.instructionMnemonic = 'LD d16, d16';
  
  CPUCore.registers[register].value = memory[parseInt(address, 16)];
  
  updateByteLengthAndCycles(info, opCodeNo);
};


module.exports = { nop, load16BitDataTo16BitRegister };