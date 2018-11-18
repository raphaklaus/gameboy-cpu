export const dolarHex = (parameters: number[]) => {
  let [first, second] = parameters.map(x => x.toString(16).padStart(2, '0'))

  if (second) {
    return `$${first}${second}`
  }

  return `$${first}`
}

export const replaceAddressPlacehold = (mnemonic: string, value: string) => {
  const placeholders = ['r8', 'd8', 'a8', 'a16', 'd16']
  return mnemonic.replace(new RegExp(placeholders.join('|')), value)
}
