const CPUCore = require('./cpuCore.js');

const load16BitDataTo16BitRegister = (register, data, byteLength, cycles) => {
    info.instructionByteLength = byteLength;

    info.instructionPrint = `LD ${register}, ${data}`;
    info.instructionMnemonic = 'LD d16, d16';

    CPUCore.registers[register] = memory[parseInt(data, 16)];
    info.cycles = cycles;
};

module.exports = { load16BitDataTo16BitRegister };