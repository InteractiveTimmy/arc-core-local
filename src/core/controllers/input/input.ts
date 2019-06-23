class Input {
  public readonly name: string;
  protected pValue: number;
  protected pActive: boolean;

  public constructor(name: string) {
    this.name = name;
    this.pValue = 0;
    this.pActive = false;
  }

  public get value(): number { return this.pValue; }
  public set value(v: number) { this.pValue = v; this.pActive = (v !== 0); }
}

export { Input };
