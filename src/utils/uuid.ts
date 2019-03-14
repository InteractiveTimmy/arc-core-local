// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
// https://github.com/mrdoob/three.js/blob/dev/src/math/Math.js

/* eslint-disable no-bitwise, no-mixed-operators, prefer-template */
const lut: string[] = [];

for (let i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}

function uuid(): string {
  const d0: number = (Math.random() * 0xffffffff) | 0;
  const d1: number = (Math.random() * 0xffffffff) | 0;
  const d2: number = (Math.random() * 0xffffffff) | 0;
  const d3: number = (Math.random() * 0xffffffff) | 0;

  return (
    lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff] +
    '-' +
    lut[d1 & 0xff] +
    lut[(d1 >> 8) & 0xff] +
    '-' +
    lut[((d1 >> 16) & 0x0f) | 0x40] +
    lut[(d1 >> 24) & 0xff] +
    '-' +
    lut[(d2 & 0x3f) | 0x80] +
    lut[(d2 >> 8) & 0xff] +
    '-' +
    lut[(d2 >> 16) & 0xff] +
    lut[(d2 >> 24) & 0xff] +
    lut[d3 & 0xff] +
    lut[(d3 >> 8) & 0xff] +
    lut[(d3 >> 16) & 0xff] +
    lut[(d3 >> 24) & 0xff].toUpperCase()
  );
}

export default uuid;
