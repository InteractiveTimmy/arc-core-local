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

  get(name) { return this.inputs.find(input => input.name === name); }

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

    console.log(myInput);
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

function init() {
  const canvas = document.getElementById('app');
  const myModuleInput = new ModuleInput(canvas);

  let myPreviousValue = 0;
  let myValue = 0;
  let myRate = 2;

  let ptd = 0;
  let dt = 0;

  let loop = () => {
    ptd = performance.now() - dt;
    dt = performance.now();

    if (myModuleInput.get('A')) {
      const myInput = myModuleInput.get('A');

      let delta = myInput.getValue() - myPreviousValue;
      let change = delta / ptd;
      
      // let nextValue = myRate * (myInput.getValue() - myPreviousValue);
      let normalizer = ptd;
      // nextValue *= ptd / 1000;
      // console.log({ change, delta });
      
      myValue += myRate * change;
      myPreviousValue = myInput.getValue();

      console.log(myValue);
    };
    
    setTimeout(() => { loop(); }, 1000);
  }

  loop(0);
}

/*
const keys = {}; // stores all key events
let system;

let dt;
let lt;

let elm;

class System {
  constructor(key, rate) {
    this.key = key;
    this.rate = rate;

    this.lt;
    this.value = 0;
  }

  step(dt, myKeys) {
    if (myKeys[this.key].ds > this.lt) {
      if (myKeys[this.key].us > this.lt) {
        let mdt = myKeys[this.key].us - myKeys[this.key].ds;
        console.log(mdt);
      }
    }
    /*
    if (myKeys[this.key].pressed) {
      if (myKeys[this.key].stamp > this.lt) {
        this.value += dt * (this.lt - myKeys[this.key].stamp) * this.rate;
      } else {
        this.value += dt * this.rate;
      }
    }

    console.log(this.value);

    this.lt = performance.now();
  }
}

class Key {
  constructor(code, name) {
    this.code = code;
    this.location = location;
    this.name = name;
    this.pressed;
    this.pt;
    this.ds;
    this.us;
    this.value = 0;
  }

  get() {

  }

  press(ts) {
    this.pressed = true;
    this.ds = ts;
  }

  release(ts) {
    this.pressed = false;
    this.us = ts;
    this.pt = this.us - this.ds;
    this.value += this.us - this.ds;
  }
}

function init() {
  system = new System('065', 1);
  elm = document.querySelector('#app');

  document.onkeydown = handleInput;
  document.onkeyup = handleInput;
  document.onmousemove = handleInput;
  document.onmousedown = handleInput;
  document.onmouseup = handleInput;

  loop();
}

function handleInput(e) {
  console.log(e);
}

function handleKey(e) {
  e.preventDefault();
  if (e.repeat) { return; }

  let key = keys[`${e.location}${e.keyCode}`];

  if (!key) {
    keys[`${e.location}${e.keyCode}`] = new Key(`${e.location}${e.keyCode}`, e.code.split(/(?=[A-Z]|[0-9])/).join('-'));
    key = keys[`${e.location}${e.keyCode}`];
  }

  if (e.type === 'keydown') { key.press(e.timeStamp); }
  else { key.release(e.timeStamp); }
}

function loop() {
  // requestAnimationFrame(() => loop());
  setTimeout(() => { loop(); }, 1000);

  dt = performance.now() - lt;
  lt = performance.now();

  // system.step(dt, keys);

  
  // console.log(keys['065'].value);
}
*/