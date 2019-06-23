/* TODO
// has cache
// has loader
// has graphics
// has audio
// has input
*/

import { InputController } from './input-controller';

class Core {
  public readonly canvas: HTMLCanvasElement;

  protected pInputController: InputController;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.pInputController = new InputController(this.canvas);
    this.pInputController.toggleLocking();
  }
}

export { Core };
