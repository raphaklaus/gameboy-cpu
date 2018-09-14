import opcodesJSON from '../scrapper/output.json'
import { addHexPrefix } from '../core/hex.util';

const bootstrapCPU = () => {
  return {
    registers: {
      AF: 0x01b0,
      BC: 0x13,
      DE: 0xd8,
      HL: 0x14D,
      SP: 0xfffe,
      PC: 0x00,
      LCDC: 0x91,
      MBC: 0x00
    }
  }
}

export const run = (rom: Uint8Array) => {
  const cpu = bootstrapCPU()
  let parsingParameters = false
  let opcodeParameters: number[] = []
  let rowIndex
  let columnIndex
  let currentOpcode
  let currentAddress

  for (let index = 0; index < rom.slice(0,4).length; index++) {
    if (!parsingParameters) {
      currentAddress = rom[index].toString(16).padStart(2, '0').toUpperCase()

      rowIndex = parseInt(addHexPrefix(currentAddress[0]))
      columnIndex = parseInt(addHexPrefix(currentAddress[1]))
      currentOpcode = opcodesJSON[rowIndex][columnIndex]

      if (currentOpcode.byteLength > 1) {
        parsingParameters = true
      }
    } else {
      opcodeParameters.push(rom[index])

      if (currentOpcode.byteLength - 1 - opcodeParameters.length === 0) {
        console.log('teste', opcodeParameters)
        parsingParameters = false
        opcodeParameters = []
        // todo: Exec operation
      }
    }
  }
}
