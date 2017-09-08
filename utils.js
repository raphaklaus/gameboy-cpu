const toHex = number => {
  if (Number(number).toString().length > 1)
    return ('0000' + Number(number).toString('16')).substr(-4);
};

module.exports = { toHex };
