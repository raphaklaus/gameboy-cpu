const utils = require('./utils');

var CPUCore = require('./cpuCore.js');

const affectFlagsOnIncrement = (value, flags) => {
  if (value === 0)
    CPUCore.CPUCore.flags.Z = 1;
  else
    CPUCore.flags.Z = 0;

  CPUCore.flags.N = 0;

  if (utils.carriedFromBit3(value))
    CPUCore.flags.H = 1;
  else
    CPUCore.flags.H = 0;
};

const affectFlagsOnDecrement = (value, flags) => {
  if (value === 0)
    CPUCore.flags.Z = 1;
  else
    CPUCore.flags.Z = 0;

  CPUCore.flags.N = 1;

  if (utils.carriedFromBit3(value))
    CPUCore.flags.H = 1;
  else
    CPUCore.flags.H = 0;
};

const affectFlagOnRotateLeft = (value, flags, oldBit7) => {
  if (value === 0)
    CPUCore.flags.Z = 1;
  else
    CPUCore.flags.Z = 0;

  CPUCore.flags.N = 0;
  CPUCore.flags.H = 0;
  CPUCore.flags.C = oldBit7;
};

const affectFlagOnAdd = (value, flags) => {
  flag.N = 0;

  if (utils.carriedFromBit11(value))
    flag.H = 1;
  else
    flag.H = 0;

  if (utils.carriedFromBit15(value))
    flag.C = 1;
  else
    flag.C = 0;
};

module.exports = { affectFlagsOnIncrement, affectFlagsOnDecrement,
  affectFlagOnRotateLeft, affectFlagOnAdd };
