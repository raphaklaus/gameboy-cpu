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

module.exports = { toHex, toHexCompose };
