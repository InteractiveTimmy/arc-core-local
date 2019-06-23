class Position extends ArcCore.objects.Component {
  constructor(x, y, z) {
    super();

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
}

class Velocity extends ArcCore.objects.Component {
  constructor(x, y, z) {
    super();
    
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
}

class Physics extends ArcCore.objects.System {
  constructor() {
    super();

    this.components = [
      Position,
      Velocity,
    ];
  }

  update(scene, dt) {
    scene.getEntities(...this.components).forEach((entity) => {
      entity.components.position.x += entity.components.velocity.x * dt;
      entity.components.position.y += entity.components.velocity.y * dt;
      entity.components.position.z += entity.components.velocity.z * dt;
    });
  }
}

function genEntities(count) {
  const output = [];

  for (let i = 0; i < count; i++) {
    output.push(new ArcCore.objects.Entity());
  }

  return output;
}

const instance = new ArcCore.objects.Instance();
const scene = new ArcCore.objects.Scene();
let running = false;

function start() { if (!running) { running = true; loop(); } }
function stop() { if (running) { running = false; } }
function loop() { if (running) { instance.update(scene); setTimeout(() => { loop(); }, 0); } }

function init() {
  const canvas = document.getElementById('app');
  console.log(ArcCore);
  
  instance.load(
    new Physics(),
  );

  scene.load(...genEntities(1));

  scene.entities.forEach((entity) => {
    entity.load(
      new Position(),
      new Velocity(1, 1, 1),
      // new Velocity(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
    );
  });

  start();

  setTimeout(() => { stop(); console.log(scene.entities[0].components.position); }, 10000);
}