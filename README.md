# gameboy-cpu
High level JavaScript Nintendo Game Boy CPU emulator

## VRAM

## OAM

### Background

There are 2 blocks

* Tile Data Table / Character Data
Extends from **0x8000 ~ 0x97FF** or **0x8800 ~ 0x8FFF** and it's the image representation of 8x8 tiles.
In the first case, numbers are unsigned from 0 to 255, in the second from -128 to 127.

* Map
Holds the X and Y and other informations.

## References:
* http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf
* http://www.chrisantonellis.com/files/gameboy/gb-programming-manual.pdf
* https://github.com/AntonioND/giibiiadvance/blob/master/docs/TCAGBD.pdf
* http://marc.rawer.de/Gameboy/Docs/GBProject.pdf
