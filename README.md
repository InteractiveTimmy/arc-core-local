# Arc

## ToDo

## Design Definitions

### Class Design
*see the following github details for updates to typescript:*
 - *https://github.com/microsoft/TypeScript/pull/30829*
 - *https://github.com/microsoft/TypeScript/issues/9950*

```typescript
// import
import { something } from './something.ts';

// export class on declaration line
export class Name {
  // class properties
  // [readonly > nonreadonly] > [public > protected > private] > [primative, mutable]
  public readonly a: string; // public readonly properties first
  public readonly b: string[] // mutable properties should be readonly
  public c: string; // public properties second
  protected pD: string; // protected properties third, prefaced with 'p'
  private pE: string; // private properties fourth, prefaced with 'p'

  // class methods
  // [mutating > nonmutating] > [public > protected > private]
  public doSomething: (v: string) => Name;
  public doSomethingElse: () => string;

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
    this.pD = d;

    // assign private properties
    this.pE = e;

    // seal the class if applicable
    Object.seal(this);
  }

  // getters and setters should be paired and directly below constructor method
  public get d(): string { return this.pD; }
  public set d(value: string) { this.pD = value; }

  public get e(): string { return this.pE; }
  public set e(value: string) { this.pE = value; }

  // mutation methods next
  // should always return class object instance
  public setC(value: string): Name { this.c = value; return this; }
  public loadB(...values: string[]): Name { this.b.push(...values); return this; }

  // non-mutating methods next
  public add(): string { return this.a + this.c; }
  public addMore(value: string): string { return this.a + this.c + value; }

  // protected and private methods next [mutation first]
  protected changeD(value: string): Name { this.pD = value; return this; }
  private changeE(value: string): Name { this.pE = value; return this; }

  protected addPrivate(): string { return this.pD + this.pE; }
  private addMorePrivate(): string { return this.pD + this.pE + this.a; }
}
```