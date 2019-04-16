import { Input } from './input';

export class Keyboard {
  protected readonly pValues: Input[];

  public constructor() {
    this.pValues = [];

    document.addEventListener('keydown', (e: KeyboardEvent): void => { this.handle(e); });
    document.addEventListener('keyup', (e: KeyboardEvent): void => { this.handle(e); });
  }

  protected handle(e: KeyboardEvent): void {
    e.preventDefault();

    const myKey = this.pValues.find((item: Input): boolean => item.code === e.keyCode);

    if (myKey) {
      myKey.set((e.type === 'keyup') ? 1 : 0);
    }
  }

  public get(value: string | number): Input {
    return this.pValues.find((item: Input): boolean => (item.code === value || item.name === value));
  }
}
