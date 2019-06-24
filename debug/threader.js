const sb = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT * 2);
const float = new Float64Array(sb);

const sb2 = new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT * 2);
const uint = new Uint32Array(sb2);

function step() {
  console.log(`Float: ticks ${float[1]} == ${float[0]}`, `delta ${float[1] - float[0]}`);
  console.log(`Uint: ticks ${uint[1]} == ${uint[0]}`, `delta ${uint[1] - uint[0]}, atomic ${Atomics.load(uint, 1) - Atomics.load(uint, 0)}`);
  setTimeout(() => { step(); }, 1000);
}

function init() {
  const worker = new Worker('./worker.js');

  worker.postMessage({
    floatBuffer: sb,
    uintBuffer: sb2,
  });
  
  //step();
}