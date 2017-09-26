const Rom = require('./RawReader.js'),
  opcodes = require('./opcodes'),
  utils = require('./utils.js');

var memory = require('./memory.js'),
  CPUCore = require('./cpuCore.js'),
  flags = require('./flags.js'),
  Register16 = require('./register16.js'),
  Register8 = require('./register8.js'),
  end = false;

class CPU {
  async loadROM() {
    // Load first rom banks: 32kb
    // todo: control rom bank using MBC register to get the home 16kb area
    let rom = new Uint8Array(await Rom.load());
    console.log('length', rom.length);
    console.log('PC', CPUCore.registers.PC.value);
    // var bytes = [];

    // for (var index = 0; index < 4; index++) {
    //   opcodes.read(rom[index]);
    // }
    var startTime = new Date().getTime();
    // while (CPUCore.registers.PC.value < 0xFFFF) {
    while ((new Date()).getTime() - startTime < 3000 )  {
      console.log('I am at offset:', utils.toHex(CPUCore.registers.PC.value));
      let info = opcodes.read(rom);
      
      if (!info.leap)
        CPUCore.registers.PC.value += info.instructionByteLength;

      console.log(info.instructionPrint);
    }

    // todo: save registers, flags and memory to file

    console.log('AF', CPUCore.registers.AF);
    console.log('BC', CPUCore.registers.BC);
    console.log('DE', CPUCore.registers.DE);
    console.log('HL', CPUCore.registers.HL);
    console.log('SP', CPUCore.registers.SP);
    console.log('PC', CPUCore.registers.PC);
    
    console.log('Z Flag', CPUCore.flags.Z);
    console.log('N Flag', CPUCore.flags.N);
    console.log('H Flag', CPUCore.flags.H);
    console.log('C Flag', CPUCore.flags.C); // bug here? needs investigation
    

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