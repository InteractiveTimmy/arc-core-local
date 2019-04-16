import { Input } from './input';

export class Mouse {
  protected readonly pValues: Input[];

  public constructor() {
    this.pValues = [];

    document.addEventListener('mousemove', (e: MouseEvent): void => { this.handle(e); });
    document.addEventListener('mousedown', (e: MouseEvent): void => { this.handle(e); });
    document.addEventListener('mouseup', (e: MouseEvent): void => { this.handle(e); });
  }

  protected handle(e: MouseEvent): void {
    e.preventDefault();

    switch (e.type) {
      case 'mousemove':
        const mouseX = (e.)
        break;

      default:
    }

    const myKey = this.pValues.find((item: Input): boolean => item.code === e.keyCode);

    if (myKey) {
      myKey.set((e.type === 'keyup') ? 1 : 0);
    }
  }

  public get(value: string | number): Input {
    return this.pValues.find((item: Input): boolean => (item.code === value || item.name === value));
  }
}
