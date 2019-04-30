export class Canvas2D {
  public elm: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public constructor(target?: HTMLCanvasElement) {
    this.elm = target || document.createElement('canvas');
    this.ctx = this.elm.getContext('2d');
  }
}
