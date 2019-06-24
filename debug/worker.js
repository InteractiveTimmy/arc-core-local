self.importScripts('arc.js');

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

const comps = {
  Position,
  Velocity,
  Acceleration,
  Gravity,
};

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

function init() {
  onmessage(({ data }) => {
    switch(data.command) {
      case 'scene':
        data.entities.forEach(
          (eData) => {
            const entity = new Entity(eData.uuid);

            eData.components.forEach(
              (cData) => {
                const component = new comps[component.type];
                component.build(cData);
                entity.load(component);
              }
            )
          }
        )
        break;

      default:
    }
  });

  const instance = new Arc.core.Instance();
  instance.load(
    new Physics()
  );

  const scene = new Arc.core.Scene();
}

let buffer;
let local;
let float;
let uint;

function start() {
  while (true) {
    float[0] += 1;
    float[1] += 1;
    Atomics.add(uint, 0, 1);
    Atomics.add(uint, 1, 1);
    // Atomics.store(buffer, 0, uint[0]);
    // Atomics.store(buffer, 1, uint[1]);
    // Atomics.store(buffer, 2, uint[2]);
    // Atomics.store(buffer, 3, uint[3]);
  }
}

onmessage = (e) => {
  float = new Float64Array(e.data.floatBuffer);
  uint = new Uint32Array(e.data.uintBuffer);
  /*
  buffer = new Uint32Array(e.data.buffer);
  local = new ArrayBuffer(Uint32Array.BYTES_PER_ELEMENT * buffer.length);
  uint = new Uint32Array(local);
  float = new Float64Array(local);
  */

  start();
}
