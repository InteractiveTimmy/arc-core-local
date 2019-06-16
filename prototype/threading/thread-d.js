const buffer = new SharedArrayBuffer(1024);
const fBuffer = new Uint8Array(buffer); // change this

function step() {
  for (let i = 0; i < fBuffer.length; i++) {
    Atomics.add(fBuffer, i, 1);
  }

  setTimeout(() => { step(); }, 0);
}

step();

onmessage = ({ data }) => {
  switch(data.command) {
    case 'buffer':
      postMessage({
        command: 'buffer',
        value: buffer,
        type: 8,
      });
      break;
  }
}