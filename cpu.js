class CPU {
  constructor() {
    this.registers = {
      a: 0x00,
      b: '',
      c: '',
      d: '',
      e: '',
      f: 0xb0,
      h: '',
      l: '',
      af: 0x01,
      bc: 0x13,
      de: 0xd8,
      hl: 0x14,
      sp: 0xfffe,
      pc: 0x100
    };

    this.flags = {
      z: '',
      n: '',
      h: '',
      c: ''
    };
  }
}
