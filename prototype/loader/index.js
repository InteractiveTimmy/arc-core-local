let cid = 0;
let sab;

function init() {
  console.log('initing');
  const worker = new Worker('worker.js');

  worker.onmessage = (e) => {
    console.log(e);

    if (e.data.type === 'sab') {
      sab = e.data.sab;
    }

    console.log(sab);

    setTimeout(() => {
      const tab = new Uint32Array(sab);
      console.log(tab[0]);
    }, 3000);
  }

  worker.postMessage({ id: cid++, file: 'resources/SciFiHelmet.gltf' });
  worker.postMessage({ id: cid++, file: 'resources/SciFiHelmet.gltf' });
  // TODO - spin up new worker
  // TODO - send request to load file
  // TODO - receive request that file has been loaded
  // TODO - send request to transfer cache
  // TODO - past cache into browser [ WARN - will be slow ]
}