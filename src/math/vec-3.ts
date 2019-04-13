import { clamp } from '../utils/math';

export class Vec3 {
  public readonly isVec3: boolean;
  public x: number;
  public y: number;
  public z: number;

  public constructor(x: number, y: number, z: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    // readonly values
    Object.defineProperties(this, {
      isVec3: { value: true, writable: false },
    });
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

  // validators
  public equals(v: Vec3): boolean {
    return (
      this.x === v.x
      && this.y === v.y
      && this.z === v.z
    );
  }

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

  // transform math
  public cross(v: Vec3): Vec3 {
    this.x = this.y * v.z - this.z * v.y;
    this.y = this.z * v.x - this.x * v.z;
    this.z = this.x * v.y - this.y * v.x;

    return this;
  }

  // limiters
  public max(v: Vec3): Vec3 { return this.set(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z)); }
  public floor(): Vec3 { return this.set(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z)); }
  public ceil(): Vec3 { return this.set(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z)); }
  public clamp(min: Vec3, max: Vec3): Vec3 { return this.set(clamp(this.x, min.x, max.x), clamp(this.y, min.y, max.y), clamp(this.z, min.z, max.z)); }

  // mutators
  public normalize(): Vec3 { return this.divScalar(this.len() || 1); }
  public lenSet(value: number): Vec3 { return this.normalize().mulScalar(value); }

  // irrelative calculations
  public len(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public lenManhattan(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  // relative calculations
  public disTo(v: Vec3): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public disManhattan(v: Vec3): number {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }

  public dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public lerp(v: Vec3, a: number): Vec3 {
    this.x += (v.x - this.x) * a;
    this.y += (v.y - this.y) * a;
    this.z += (v.z - this.z) * a;

    return this;
  }
}
