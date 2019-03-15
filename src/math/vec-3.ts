class Vec3 {
  public x: number
  public y: number
  public z: number
  public readonly isVec3: boolean = true

  public constructor(x: number, y: number, z: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  // getters and setters
  public get width(): number { return this.x; }
  public set width(value: number) { this.x = value; }
  public get height(): number { return this.y; }
  public set height(value: number) { this.y = value; }
  public get depth(): number { return this.z; }
  public set depth(value: number) { this.z = value; }

  // assignment
  public set(x: number, y: number, z: number): Vec3 {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    return this;
  }

  // duplication
  public clone(): Vec3 { return new Vec3(this.x, this.y, this.z); }
  public copy(v: Vec3): Vec3 { this.x = v.x; this.y = v.y; this.z = v.z; return this; }

  // base math
  public add(v: Vec3): Vec3 { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  public sub(v: Vec3): Vec3 { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  public mul(v: Vec3): Vec3 { this.x *= v.x; this.y *= v.y; this.z *= v.z; return this; }
  public div(v: Vec3): Vec3 { this.x /= v.x; this.y /= v.y; this.z /= v.z; return this; }

  // scalar math
  public addScalar(s: number): Vec3 { this.x += s; this.y += s; this.z += s; return this; }
  public subScalar(s: number): Vec3 { this.x -= s; this.y -= s; this.z -= s; return this; }
  public mulScalar(s: number): Vec3 { this.x *= s; this.y *= s; this.z *= s; return this; }
  public divScalar(s: number): Vec3 { this.x /= s; this.y /= s; this.z /= s; return this; }
}

export default Vec3;
