const Rom = require('./RawReader.js'),
  opcodes = require('./opcodes'),
  utils = require('./utils.js');

var memory = require('./memory.js'),
  CPUCore = require('./cpuCore.js'),
  //flags = require('./flags.js'),
  Register16 = require('./register16.js'),
  Register8 = require('./register8.js'),
  end = false;

var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    clearInterval(timer);

    console.log('AF', CPUCore.registers.AF);
    console.log('BC', CPUCore.registers.BC);
    console.log('DE', CPUCore.registers.DE);
    console.log('HL', CPUCore.registers.HL);
    console.log('SP', CPUCore.registers.SP);
    console.log('PC', CPUCore.registers.PC);

    console.log('Z Flag', CPUCore.flags.Z);
    console.log('N Flag', CPUCore.flags.N);
    console.log('H Flag', CPUCore.flags.H);
    console.log('C Flag', CPUCore.flags.C);
    console.log('counter', counter);
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

var counter = 0;
var rom;

var timer;

var lastIterationEnded = true;

class CPU {
  async loadROM() {
    // Load first rom banks: 32kb
    // todo: control rom bank using MBC register to get the home 16kb area
    rom = new Uint8Array(await Rom.load());
    console.log('total length', rom.length);
  }

  run() {  
    if (lastIterationEnded) {
      lastIterationEnded = false;

      let info = {};
      
      counter++;
      
      var startTime = new Date().getTime();
      // while (CPUCore.registers.PC.value < 0xFFFF) {
      // while ((new Date()).getTime() - startTime < 3000 || end )  {
      info = opcodes.read(rom);
      
      if (!info.leap)
        CPUCore.registers.PC.value += info.instructionByteLength;
  
      console.log(info.instructionPrint);
      // }

      lastIterationEnded = true;
    }
  }

  enableMBC(romLength) {
    return romLength > 32768;
  }
}

var gameBoy = new CPU();
gameBoy.loadROM().then(data => {
  console.log(data);
  timer = setInterval(gameBoy.run, 1);
});