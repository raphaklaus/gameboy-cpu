const Register16 = require('./register16.js'),
  Register8 = require('./register8.js'),
  utils = require('./utils.js');

var registers = {
  AF: new Register16(0x01b0),
  BC: new Register16(0x13),
  DE: new Register16(0xd8),
  HL: new Register16(0x14D),
  SP: new Register16(0xfffe),
  PC: new Register16(0x00),
  LCDC: new Register8(0x91),
  MBC: new Register8(0x00)
};

var flags = {
  Z: utils.Bit7(registers.AF.Low),
  N: utils.Bit6(registers.AF.Low),
  H: utils.Bit5(registers.AF.Low),
  C: utils.Bit4(registers.AF.Low)
};

module.exports = { registers, flags };
