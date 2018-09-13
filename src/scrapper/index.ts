import cheerio from 'cheerio'
import { promises } from 'fs'

(async () => {
  const $ = cheerio.load((await promises.readFile(__dirname + '/opcodes.html')).toString())

  // todo: remove not to keep index consistency, or not?
  const data = $('tbody > tr > td').not('.invalid_inst').map((index, element) => {
    const partial = $(element).text().split(/\n/)

    const firstLine = partial[0]
    const secondLine = partial[1].trimLeft().split(' ')

    return {
      mnemonic: firstLine,
      byteLength: +secondLine[0],
      cycles: +secondLine[1],
      flagsAffected: partial[2].trimLeft(),
      action: firstLine.split(' ')[0]
    }
  }).get()

  await promises.writeFile(__dirname + '/output.json', JSON.stringify(data, null, 4))
  console.log('Done')
})()


