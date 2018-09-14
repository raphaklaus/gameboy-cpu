import { promises } from 'fs'
import { createMemory } from './memory';
import { run } from './cpu';

(async () => {
  const rom = new Uint8Array(await promises.readFile(__dirname + '/../../roms/Tetris.gb'))
  const memory = createMemory()
  console.log('rom', rom[0])
  console.log('memory space', memory.length)
  run(rom)
})()
