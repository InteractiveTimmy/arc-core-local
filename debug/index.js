class Position extends Arc.core.Component {
  constructor(x, y, z) {
    super();

    this.data = new Arc.core.Vec3(x, y, z);
  }
}

class Velocity extends Arc.core.Component {
  constructor(x, y, z) {
    super();
    
    this.data = new Arc.core.Vec3(x, y, z);
  }
}

class Acceleration extends Arc.core.Component {
  constructor(x, y, z) {
    super();

    this.data = new Arc.core.Vec3(x, y, z);
  }
}

class Gravity extends Arc.core.Component {
  constructor(x, y, z) {
    super();

    this.data = new Arc.core.Vec3(x, y, z);
  }
}

class Physics extends Arc.core.System {
  constructor() {
    super();

    this.cAddVelocity = [
      Position,
      Velocity,
    ];

    this.cAddAcceleration = [
      Acceleration,
      Velocity,
    ];

    this.cAddGravity = [
      Gravity,
      Velocity,
    ];
  }

  update(scene, dt) {
    scene.getEntities(...this.cAddGravity).forEach((entity) => {
      entity.components.velocity.x += entity.components.gravity.x * dt;
      entity.components.velocity.y += entity.components.gravity.y * dt;
      entity.components.velocity.z += entity.components.gravity.z * dt;
    });

    scene.getEntities(...this.cAddAcceleration).forEach((entity) => {
      entity.components.velocity.x += entity.components.acceleration.x * dt;
      entity.components.velocity.y += entity.components.acceleration.y * dt;
      entity.components.velocity.z += entity.components.acceleration.z * dt;
    });

    scene.getEntities(...this.cAddVelocity).forEach((entity) => {
      entity.components.position.x += entity.components.velocity.x * dt;
      entity.components.position.y += entity.components.velocity.y * dt;
      entity.components.position.z += entity.components.velocity.z * dt;
    });
  }
}

function genEntities(count) {
  const output = [];

  for (let i = 0; i < count; i++) {
    output.push(new Arc.core.Entity());
  }

  return output;
}

const instance = new Arc.core.Instance();
const scene = new Arc.core.Scene();
const runtime = 5;
let starttime = null;
let running = false;
let frames = 0;

function start() { if (!running) { running = true; starttime = Date.now(); loop(); } }
function stop() { if (running) { running = false; } }
function loop() {
  while (Date.now() < starttime + (runtime * 1000)) {
    instance.update(scene);
    frames++;
  }
  console.log(`tps - ${frames / runtime}`, scene);
  /*
  if (running) {
    instance.update(scene);
    frames++;
    setTimeout(() => { loop(); }, 0);
  }
  */
}

function init() {
  const canvas = document.getElementById('app');
  console.log(Arc.core);
  
  instance.load(
    new Physics(),
  );

  let entities = genEntities(10000);
  entities.forEach((entity) => {
    entity.load(
      new Position(),
      // new Velocity(1, 1, 1),
      // new Acceleration(1, 1, 1),
      // new Gravity(1, 1, 1),
      // new Velocity(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
    );
  });

  let otherEntities = entities.filter(entity => Math.random() > 0.5);

  scene.load(...entities);

  otherEntities.forEach((entity) => {
    entity.load(
      new Gravity(0, -10, 0),
      new Velocity(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
    );
  })
  //scene.unload(...otherEntities);
  /* NOTE - add components after scene loading
  scene.load(...genEntities(10000));

  scene.entities.forEach((entity) => {
    entity.load(
      new Position(),
      new Velocity(1, 1, 1),
      new Acceleration(1, 1, 1),
      new Gravity(1, 1, 1),
      // new Velocity(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
    );
  });
  */

  start();

  const workers = [];
  for (let i = 0; i < navigator.hardwareConcurrency; i++) {
    workers.push(new Worker('./worker.js'));
  }

  setTimeout(() => {
    workers.forEach((worker) => {
      worker.terminate();
    });

    console.log('terminated workers');
  }, 10000);
  //setTimeout(() => { stop(); console.log(`fps - ${frames / runtime}`, { scene, otherEntities}); }, runtime * 1000);
}