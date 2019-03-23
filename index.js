const ArcCore = require('./build/arc-core');
console.log( ArcCore);

const myInstance = new ArcCore.core.Instance();

myInstance.start();

setTimeout(() => { myInstance.stop() }, 1000);