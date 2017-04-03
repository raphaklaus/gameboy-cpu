# gameboy-cpu
High level JavaScript Nintendo Game Boy CPU emulator

## VRAM

There are 2 blocks

* Tile Data Table / Character Data
Extends from **0x8000 ~ 0x97FF** (default to OBJ but can hold BG/Window too) or **0x8800 ~ 0x8FFF** and it's the image representation of 8x8 tiles.
In the first case, numbers are unsigned from 0 to 255, in the second from -128 to 127.
LCDC register configuration determines the BG & Window tile data and tile map.

* Bit 7 - LCDC Control Operation *
  * 0: Stop completely (no picture on screen)
  * 1: operation
* Bit 6 - Window Tile Map Display Select
  * 0: $9800-$9BFF
  * 1: $9C00-$9FFF
* Bit 5 - Window Display
  * 0: off
  * 1: on
* Bit 4 - BG & Window Tile Data Select
  * 0: $8800-$97FF
  * 1: $8000-$8FFF <- Same area as OBJ
* Bit 3 - BG Tile Map Display Select
  * 0: $9800-$9BFF
  * 1: $9C00-$9FFF
* Bit 2 - OBJ (Sprite) Size
  * 0: 8*8
  * 1: 8*16 (width*height)
* Bit 1 - OBJ (Sprite) Display
  * 0: off
  * 1: on
* Bit 0 - BG & Window Display
  * 0: off
  * 1: on


* Map
Holds the X and Y and other informations.

## References:
* http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf
* http://www.chrisantonellis.com/files/gameboy/gb-programming-manual.pdf
* https://github.com/AntonioND/giibiiadvance/blob/master/docs/TCAGBD.pdf
* http://marc.rawer.de/Gameboy/Docs/GBProject.pdf
