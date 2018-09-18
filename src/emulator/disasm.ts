import { dolarHex } from "./hex.util";

export const buildText = (currentOpcode: any, opcodeParameters: number[]) => {
  if (opcodeParameters.length > 0) {
    return `${currentOpcode.mnemonic} ${dolarHex(opcodeParameters.reverse())}\n`
  }

  return `${currentOpcode.mnemonic}\n`
}
