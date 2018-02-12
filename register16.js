module.exports = class Register16 {
  constructor(value) {
    this.value = value;
  }

  get High() {
    return this.value >> 8;
  }

  get Low() {
    return this.value & 0xFF;
  }

  set High(byte) {
    this.value = byte << 8 | this.value;
  }

  set Low(byte) {
    this.value = this.value & 0xFF << 8 | byte;
  }
};
