import { Input } from './input';

function generateName(location: number, key: string): string {
  let name: string;

  switch (location) {
    case 1: name = 'L-'; break;
    case 2: name = 'R-'; break;
    case 3: name = 'N-'; break;
    default: name = '';
  }

  name += key.toUpperCase();

  return name;
}

class KeyboardListener {
  protected pEnabled: boolean;
  protected readonly pInputs: Input[]; // contains all Input class objects

  public constructor() {
    // setup event handlers
    document.onkeydown = this.handleEvent.bind(this);
    document.onkeyup = this.handleEvent.bind(this);

    // instance class properties
    this.pInputs = []; // create namespace for inputs
    this.pEnabled = false; // set listener to disabled during construction
  }

  protected enable(): KeyboardListener {
    // setup event handlers
    document.onkeydown = this.handleEvent.bind(this);
    document.onkeyup = this.handleEvent.bind(this);

    // toggle enabled flag
    this.pEnabled = true;

    return this;
  }

  protected disable(): KeyboardListener {
    // remove event handlers
    document.onkeydown = undefined;
    document.onkeyup = undefined;

    // set values of all input class objects to 0
    this.pInputs.forEach((input: Input): void => { input.value = 0; });

    // toggle enable flag
    this.pEnabled = false;

    return this;
  }

  protected handleEvent(e: KeyboardEvent): KeyboardListener {
    // prevent default action of input
    e.preventDefault();

    switch (e.type) {
      case 'keydown': this.handleKeyDown(e); break;
      case 'keyup': this.handleKeyUp(e); break;
      default:
    }

    return this;
  }

  protected getInput(name: string): Input {
    return this.pInputs.find((i: Input): boolean => i.name === name) || new Input(name);
  }

  protected handleKeyDown(e: KeyboardEvent): void {
    if (e.repeat) { return; }

    const name = generateName(e.location, e.key);
    const input = this.getInput(name);
    input.value = 1;
  }

  protected handleKeyUp(e: KeyboardEvent): void {
    const name = generateName(e.location, e.key);
    const input = this.getInput(name);
    input.value = 0;
  }
}

export { KeyboardListener };
