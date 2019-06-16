const workers = [];
const buffers = [];
const fBuffers = [];
const elms = [];

/*
interface event {
  command: string,
  value: buffer,
}
*/

function genBuffer(buffer, type) {
  let output;

  switch (type) {
    case 8:
      output = new Uint8Array(buffer);
      break;

    case 16:
      output = new Uint16Array(buffer);
      break;

    case 32:
      output = new Uint32Array(buffer);
      break;

    default:
  }
  return output;
}

function handleMessage(message, index) {
  switch (message.command) {
    case 'buffer':
      buffers[index] = message.value;
      fBuffers[index] = genBuffer(message.value, message.type);
      break;
  }
}

function step() {
  if (fBuffers.length === 3) {
    elms[0].innerHTML = fBuffers[0][0];
    elms[1].innerHTML = fBuffers[1][0];
    elms[2].innerHTML = fBuffers[2][0];
  }

  setTimeout(() => { step(); }, 0);
}

function init() {
  workers.push(new Worker('thread-b.js'));
  workers.push(new Worker('thread-c.js'));
  workers.push(new Worker('thread-d.js'));

  elms.push(document.getElementById('thread-b'));
  elms.push(document.getElementById('thread-c'));
  elms.push(document.getElementById('thread-d'));

  workers.forEach((worker, i) => {
    worker.onmessage = ({ data }) => {
      handleMessage(data, i);
    };

    worker.postMessage({ command: 'buffer' });
  });

  step();
}