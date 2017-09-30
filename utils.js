const toHex = number => {
  let hex = (number).toString('16');

  if (hex.length > 2)
    return '0x' + ('00' + hex.toUpperCase()).substr(-4);
  else
    return '0x' + ('00' + hex.toUpperCase()).substr(-2);
};

const toHexCompose = (firstNumber, secondNumber) => {
  return '0x' + ('00' + (secondNumber).toString('16').toUpperCase()).substr(-2) +
    ('00' + (firstNumber).toString('16').toUpperCase()).substr(-2)
}

const Bit7 = value => {
  return value & 0x80 ? 1 : 0;
}

const Bit6 = value => {
  return value & 0x40 ? 1 : 0;
}

const Bit5 = value => {
  return value & 0x20 ? 1 : 0;
}

const Bit4 = value => {
  return value & 0x10 ? 1 : 0;
}

const Bit3 = value => {
  return value & 0x08 ? 1 : 0;
}

const Bit2 = value => {
  return value & 0x04 ? 1 : 0;
}

const Bit1 = value => {
  return value & 0x02 ? 1 : 0;
}

const Bit0 = value => {
  return value & 0x01 ? 1 : 0;
}

const getHighByte = word => {
  return word & 0xFF;
};

const getLowByte = word => {
  return word >> 8  
};

const setHighByte = (word, byte) => {
  return byte << 8 | word;
};

const setLowByte = (word, byte) => {
  return word & 0xFF << 8 | byte;
};

const carriedFromBit3 = value => {
  return value & 0x1F;
}

const carriedFromBit11 = value => {
  return value & 0xFFF;
}

const carriedFromBit15 = value => {
  return value & 0xFFFF;
}

const borrowedFromBit4 = value => {
  return value & 0x0F;
}

const rotateByteLeft = value => {
  return (value << 1) | (value >> 7);
};

// const prettyPrint = () => {
//   info.instructionPrint = `LD BC, ${data}`;
//   info.instructionMnemonic = 'LD BC, d16';
// }

module.exports = { toHex, toHexCompose, getHighByte, setHighByte, getLowByte, 
  setLowByte, carriedFromBit3, carriedFromBit11, carriedFromBit15, borrowedFromBit4,
  rotateByteLeft, Bit0, Bit1, Bit2, Bit3, Bit4, Bit5, Bit6, Bit7 };
