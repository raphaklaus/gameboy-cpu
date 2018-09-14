export const getHigh = (value: number) => {
  return value >> 8;
}

export const getLow = (value: number) => {
  return value & 0xFF;
}

export const setHigh = (value: number, byte: number) => {
  return byte << 8 | value;
}

export const setLow = (value: number, byte: number) => {
  return value & 0xFF << 8 | byte;
}
