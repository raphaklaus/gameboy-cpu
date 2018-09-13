# Game Boy CPU Emulator

## Motivation

Understand how CPU's works in low level but keeping the implementation at the highest level possible.

The idea is scrapping the CPU manuals to retrieve most data possible and make the CPU implementation less manual.

This is a WIP project, you can take a look at the `output.json` inside `src/scrapper` to have an idea how the specifications is been built.

All the opcodes are separated by groups of operations. Like `ld`, `call` and `bit` since there is no need to have repeated blocks of code, I just tweak each opcode with the informations from `output.json` mentioned earlier.

## Internals

### CPU

Flags:

* Z (zero)
* N (Subtract)
* H (Half Carry)
* C (Carry)

Registers 8-bit:

* A
* B
* C
* D
* E
* H
* L

Registers 16-bit:

* AF (Accumulator and Flags)
* BC
* DE
* HL
* SP (Stack Pointer)
* PC (Program Counter)

Interrupts:

* HBlank
* VBlank
* IO
* More TBD

## Memory

32 Kb built-in initially. 

## References

http://zenol.fr/gb-doc/gameboy-opcodes.html
http://www.devrs.com/gb/files/opcodes.html
https://rednex.github.io/rgbds/gbz80.7.html
