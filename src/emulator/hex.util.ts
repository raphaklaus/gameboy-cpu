export const dolarHex = (parameters: number[]) => {
  let [first, second] = parameters.map(x => x.toString(16).padStart(2, '0'))

  if (second) {
    return `$${first}${second}`
  }

  return `$${first}`
}
