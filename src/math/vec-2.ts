class Vec2 {
  public x: number
  public y: number
  public readonly isVec2: boolean = true

  public constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // getters and setters
  public get width(): number { return this.x; }
  public set width(value: number) { this.x = value; }
  public get height(): number { return this.y; }
  public set height(value: number) { this.y = value; }

  // assignment
  public set(x: number, y: number): Vec2 {
    this.x = x || 0;
    this.y = y || 0;

    return this;
  }

  // duplication
  public clone(): Vec2 { return new Vec2(this.x, this.y); }
  public copy(v: Vec2): Vec2 { this.x = v.x; this.y = v.y; return this; }

  // base math
  public add(v: Vec2): Vec2 { this.x += v.x; this.y += v.y; return this; }
  public sub(v: Vec2): Vec2 { this.x -= v.x; this.y -= v.y; return this; }
  public mul(v: Vec2): Vec2 { this.x *= v.x; this.y *= v.y; return this; }
  public div(v: Vec2): Vec2 { this.x /= v.x; this.y /= v.y; return this; }

  // scalar math
  public addScalar(s: number): Vec2 { this.x += s; this.y += s; return this; }
  public subScalar(s: number): Vec2 { this.x -= s; this.y -= s; return this; }
  public mulScalar(s: number): Vec2 { this.x *= s; this.y *= s; return this; }
  public divScalar(s: number): Vec2 { this.x /= s; this.y /= s; return this; }
}

export default Vec2;
