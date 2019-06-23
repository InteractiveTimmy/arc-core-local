# ArcCore

## Class Design
```typescript
// import
import { something } from './something.ts';

class Name {
  public readonly a: string; // public readonly properties first
  public readonly b: string[] // mutable properties should be readonly
  public c: string; // public properties second
  protected #d: string; // protected properties third, prefaced with '#'
  private #e: string; // private properties fourth, prefaced with '#'

  // constructor stores values based on above order
  public constructor(a: string, b: string[], c: string, d: string, e: string) {
    // use object.defineProperties() method for readonly
    // value should be assigned last
    // mutable objects should use spread operators
    Object.defineProperties(this, {
      a: { writable: false, value: a },
      b: { writable: false, value: [...b] },
    });

    // assign public properties
    this.c = c;

    // assign protected properties
    this.#d = d;

    // assign private properties
    this.#e = e;

    // seal the class if applicable
    Object.seal(this);
  }

  // getters and setters should be paired and directly below constructor method
  public get d(): string { return this.#d; }
  public set d(value: string) { this.#d = value; }

  public get e(): string { return this.#e; }
  public set e(value: string) { this.#e = value; }

  // mutation methods next
  // should always return class object instance
  public setC(value: string): Name { this.c = value; return this; }
  public loadB(...values: string[]): Name { this.b.push(...values); return this; }

  // non-mutating methods next
  public add(): string { return this.a + this.c; }
  public addMore(value: string): string { return this.a + this.c + value; }

  // protected and private methods next [mutation first]
  protected changeD(value: string): Name { this.#d = value; return this; }
  private changeE(value: string): Name { this.#e = value; return this; }

  protected addPrivate(): string { return this.#d + this.#e; }
  private addMorePrivate(): string { return this.#d + this.#e + this.a; }
}
```

```mermaid
graph TD;
A --> B;
A --> C;
B --> D;
C --> D;
```