export class Input {
  public code: number;
  public name: string;
  public value: number;
  public ts: number;

  public constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
    this.value = 0;
    this.ts = 0;
  }

  public set(value: number, ts: number): Input { this.value = value; this.ts = ts; return this; }
}
