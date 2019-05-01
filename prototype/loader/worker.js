// TODO - setup on message
// TODO - create data store
// TODO - load files using fetch on message
// TODO

class Loader {
  constructor() {
    this.store = {};
  }

  handle(payload) {
    console.log(payload);

    this.store[payload.id] = {
      loaded: false,
      data: {},
    };

    // get type from payload
    const file = payload.file.split('.');
    const ext = file[file.length - 1];


    switch (ext) {
      case 'gltf':
        this.gltf(payload.file)
          .catch((e) => { console.log(e); })
          .then((r) => {
            this.store[payload.id].data = r;
            console.log(this.store);
          })
        break;
    }
  }

  load(url, type) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .catch((e) => { reject(new Error(e)); })
        .then(r => r[type]())
        .catch((e) => { reject(new Error(e)); })
        .then((r) => { resolve(r); })
    });
  }

  gltf(url) {
    return new Promise((resolve, reject) => {
      const output = {};
      let gltf;
      const root = url.split('/').slice(0, -1).join('/');
      console.log(root);
      let bin;

      this.load(url, 'json')
        .catch((e) => { reject(new Error(e)); })
        .then(r => {
          gltf = r;
          bin = `${root}/`
          console.log(gltf);
          return Promise.all(r.images.map(image => this.load(image.uri, 'arrayBuffer')))
        })
        .catch((e) => { reject(new Error(e)); })
        .then((r) => { output.images = r; return Promise.all(gltf.buffers.map(buffer => this.load(`${bin}/${buffer.uri}`, 'arrayBuffer')))})
        .catch((e) => { reject(new Error(e)); })
        .then((r) => { output.buffer = r; resolve(output); });
    });
  }

  retrieve(id) {

  }
}

const loader = new Loader();

onmessage = (e) => {
  loader.handle(e.data);
}