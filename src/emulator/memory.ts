export const createMemory = (size = 2**16-1): Uint8Array => {
  return new Uint8Array(size)
}

export const setValue = (memory: number[], location: number, value: number) => {
  memory[location] = value
}

export const readValue = (memory: number[], location: number) => {
  return memory[location]
}
