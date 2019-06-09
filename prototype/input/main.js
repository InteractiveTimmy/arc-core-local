class ModuleInput {
  constructor(canvas) {
    this.canvas = canvas; // stores element to operate on

    // setup pointer lock
    canvas.onclick = () => { canvas.requestPointerLock(); };
    document.addEventListener('pointerlockchange', () => { this.handlePointerLock(); }, false);

    // setup keyboard event listener
    document.onkeydown = (e) => { this.handleEvent(e); };
    document.onkeyup = (e) => { this.handleEvent(e); };

    // setup mouse event listener
    document.onmousemove = (e) => { this.handleEvent(e); }
    document.onmousedown = (e) => { this.handleEvent(e); }
    document.onmouseup = (e) => { this.handleEvent(e); }

    // status
    this.inputs = []; // contains list of all key class objects
    this.active = false; // identifies if the pointer is locked or not
  }

  get(name) {
    let input = this.inputs.find(input => input.name === name);

    if (!input) {
      input = new Input(name);
      this.inputs.push(input);
    }

    return input;
  }

  handlePointerLock() {
    if (document.pointerLockElement === this.canvas) { this.active = true; }
    else { this.active = false; }
  }

  handleEvent(e) {
    if (!this.active) {return;}
    e.preventDefault();

    switch (e.type) {
      case 'mousedown':
      case 'mouseup':
        this.handleMouseButton(e);
        break;

      case 'keydown':
      case 'keyup':
        this.handleKeyboard(e);
        break;
    }
  }

  handleKeyboard(e) {
    if (e.repeat) { return; }

    let locationName;

    switch (e.location) {
      case 1:
        locationName = 'L-';
        break;
      
      case 2:
        locationName = 'R-';
        break;

      case 3:
        locationName = 'N-';
        break;

      default:
        locationName = '';
    }

    const keyName = e.key.toUpperCase();

    let myInput = this.get(locationName + keyName);

    if (!myInput) {
      myInput = new Input(locationName + keyName);
      this.inputs.push(myInput);
    }

    if (e.type === 'keydown') { myInput.press(e.timeStamp); }
    else { myInput.depress(e.timeStamp); }
  }

  handleMouseButton(e) {
    console.log(e);
  }
}

class Input {
  constructor(name) {
    this.name = name;
    this.pressed = false;
    this.pressedTimestamp = 0;
    this.value = 0;
  }

  getValue() {
    if (!this.pressed) {
      return this.value;
    } else {
      return (performance.now() - this.pressedTimestamp + this.value);
    }
  }

  press(timestamp) {
    this.pressed = true;
    this.pressedTimestamp = timestamp;

    return this;
  }

  depress(timestamp) {
    this.pressed = false;
    this.value += timestamp - this.pressedTimestamp;

    return this;
  }
}

class Shape {
  constructor(x, y, w, h, c = '#eee') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw(ctx) {
    const { x, y, w, h, c } = this;
    ctx.fillStyle = c;
    ctx.rect(x, y, w, h);
    ctx.fill();
  }
}

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.shapes = [];
    this.active = false;

    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
  }

  render() {
    const { canvas, ctx } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    this.shapes.forEach((shape) => {
      shape.draw(ctx);
    });
    ctx.closePath();
  }

  loop() {
    if (this.active) { requestAnimationFrame(() => { this.loop(); }); }
    this.render();
  }

  start() {
    if (!this.active) { this.active = true; this.loop(); }
  }

  stop() {
    if (this.active) { this.active = false; }
  }
}

function init() {
  const canvas = document.getElementById('app');
  const myModuleInput = new ModuleInput(canvas);

  const myRenderer = new Renderer(canvas);
  const myShape = new Shape(20, 20, 20, 20, '#ff0000');

  myRenderer.shapes.push(myShape);

  myRenderer.start();

  myInputs = [
    myModuleInput.get('A'),
    myModuleInput.get('S'),
    myModuleInput.get('D'),
    myModuleInput.get('W'),
  ];

  myPrevValues = [0, 0, 0, 0];

  let myPreviousValue = 0;
  let myRate = 10;

  let ptd = 0;
  let dt = 0;

  let loop = () => {
    ptd = performance.now() - dt;
    dt = performance.now();

    myInputs.forEach((input, i) => {
      let delta = input.getValue() - myPrevValues[i];
      let change = delta / ptd;
      console.log(change);
      console.log(delta);

      switch (i) {
        case 0:
          myShape.x -= myRate * change;
          break;

        case 1:
          myShape.y += myRate * change;
          break;

        case 2:
          myShape.x += myRate * change;
          break;

        case 3:
          myShape.y -= myRate * change;
          break;

        default:
      }

      myPrevValues[i] = input.getValue();
    });
    
    setTimeout(() => { loop(); }, 0);
  }

  loop(0);
}