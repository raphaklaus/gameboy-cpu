utils = require('./utils');

const affectFlagsOnIncrement = (value, flags) => {
  if (value === 0)
    flags.z = 1;
  else
    flags.z = 0;

  flags.n = 0;

  if (utils.carriedFromBit3(value))
    flags.h = 1;
  else
    flags.h = 0;
};

const affectFlagsOnDecrement = (value, flags) => {
  if (value === 0)
    flags.z = 1;
  else
    flags.z = 0;

  flags.n = 1;

  if (utils.carriedFromBit3(value))
    flags.h = 1;
  else
    flags.h = 0;
};

const affectFlagOnRotateLeft = (value, flags, oldBit7) => {
  if (value === 0)
    flags.z = 1;
  else
    flags.z = 0;

  flags.n = 0;
  flags.h = 0;
  flags.c = oldBit7;
};

const affectFlagOnAdd = (value, flags) => {
  flag.n = 0;

  if (utils.carriedFromBit11(value))
    flag.h = 1;
  else
    flag.h = 0;

  if (utils.carriedFromBit15(value))
    flag.c = 1;
  else
    flag.c = 0;
};

module.exports = { affectFlagsOnIncrement, affectFlagsOnDecrement, 
  affectFlagOnRotateLeft, affectFlagOnAdd};