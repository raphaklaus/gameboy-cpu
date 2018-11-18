import { dolarHex, replaceAddressPlacehold } from "./hex.util";

export const buildText = (currentOpcode: any, opcodeParameters: number[]) => {
  if (opcodeParameters.length > 0) {
    return `${replaceAddressPlacehold(`${currentOpcode.mnemonic}`, dolarHex(opcodeParameters.reverse()))}\n`
  }

  return `${currentOpcode.mnemonic}\n`
}
