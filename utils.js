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

module.exports = { toHex, toHexCompose, getHighByte, setHighByte, getLowByte, 
  setLowByte, carriedFromBit3, carriedFromBit11, carriedFromBit15 };
