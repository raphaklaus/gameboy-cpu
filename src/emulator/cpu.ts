import { promises } from 'fs'
import { addHexPrefix } from '../core/hex.util';
import { dolarHex } from './hex.util';
import { buildText } from './disasm';

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

export const run = async (rom: Uint8Array) => {
  const cpu = bootstrapCPU()
  let parsingParameters = false
  let opcodeParameters: number[] = []
  let rowIndex
  let columnIndex
  let cbRowIndex
  let cbColumnIndex
  let disasm = ''

  let currentOpcode
  let currentAddress

  const opcodesJSON: any[] = JSON.parse(await promises.readFile(`${__dirname}/../scrapper/output.json`, { encoding: 'utf8' }))

  for (let index = 0; index < rom.length; index++) {
    if (!parsingParameters) {
      currentAddress = rom[index].toString(16).padStart(2, '0').toUpperCase()

      rowIndex = parseInt(addHexPrefix(currentAddress[0]))
      columnIndex = parseInt(addHexPrefix(currentAddress[1]))

      if (opcodesJSON[rowIndex][columnIndex].length === undefined) {
        currentOpcode = opcodesJSON[rowIndex][columnIndex]

      } else {
        let cbCurrentAddress = rom[++index].toString(16).padStart(2, '0').toUpperCase()

        cbRowIndex = parseInt(addHexPrefix(cbCurrentAddress[0]))
        cbColumnIndex = parseInt(addHexPrefix(cbCurrentAddress[1]))
        currentOpcode = opcodesJSON[rowIndex][columnIndex][cbRowIndex][cbColumnIndex]
      }

      if ((currentOpcode.byteLength > 1) && !(rowIndex === 0xc && columnIndex === 0xb))  {
        parsingParameters = true
      }
    } else {
      opcodeParameters.push(rom[index])
    }

    if ((currentOpcode.byteLength - 1 - opcodeParameters.length === 0) || (rowIndex === 0xc && columnIndex === 0xb)) {
      disasm += buildText(currentOpcode, opcodeParameters)
      parsingParameters = false
      opcodeParameters = []
      // todo: Exec operation
    }
  }

  console.log('result', __dirname)
  await promises.writeFile(`${__dirname}/../../disasm.txt`, disasm, { encoding: 'utf8' })
}
