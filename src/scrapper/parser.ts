import { RegisterSemantics } from "../../core/register-semantics.enum";
import { FlagBehavior } from "../../core/flag-behavior.enum";

const checkDoubleMember = (mnemonic: string) => {
  return mnemonic.indexOf(',') >= 0
}

const valueFromMemoryInFirstMember = (mnemonic: string) => {
  return mnemonic.indexOf('),') >= 0
}

const valueFromMemoryInSecondMember = (mnemonic: string) => {
  return mnemonic.indexOf(',(') >= 0
}

const valueFromMemory = (mnemonic: string) => {
  return mnemonic.indexOf('(') >= 0
}

export const getRegistersDetails = (mnemonic: string) => {
  if (checkDoubleMember(mnemonic)) {
    return {
      registerDetails: {
        first: valueFromMemoryInFirstMember(mnemonic) ? RegisterSemantics.Memory : RegisterSemantics.Value,
        second: valueFromMemoryInSecondMember(mnemonic) ? RegisterSemantics.Memory : RegisterSemantics.Value
      }
    }
  } else if (valueFromMemory(mnemonic)) {
    return {
      registerDetails: {
        first: RegisterSemantics.Memory
      }
    }
  }
}

const parseFlags = (flags: string) => {
  return flags.split(' ').map(flag => {
    if (flag.match(/[A-Z]/g)) {
      return FlagBehavior.Context
    } else if (flag === '0') {
      return FlagBehavior.Zero
    } else if (flag === '1') {
      return FlagBehavior.One
    }

    return FlagBehavior.NotAffected
  })
}

export const getFlagsAffected = (flags: string) => {
  const transformedFlags = parseFlags(flags)

  return {
    flagsAffected: {
      z: transformedFlags[0],
      n: transformedFlags[1],
      h: transformedFlags[2],
      c: transformedFlags[3]
    }
  }
}
