import cheerio from 'cheerio'
import { promises } from 'fs'
import { tableParser } from './parser';
import { splitEvery } from 'ramda'

(async () => {
  const $ = cheerio.load((await promises.readFile(__dirname + '/opcodes.html')).toString())

  let data: any = splitEvery(16, tableParser($, 'main_table'))

  data[0xc][0xb] = splitEvery(16, tableParser($, 'cb_table'))

  await promises.writeFile(__dirname + '/output.json', JSON.stringify(data, null, 4))
  console.log('Done')
})()


