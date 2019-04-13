import { clamp } from '../utils/math';

// TODO: 18 methods
// REVIEW: 23 methods

export class Vec3 {
  public readonly isVec3: boolean;
  public x: number;
  public y: number;
  public z: number;

  public constructor(x: number, y: number, z: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    Object.defineProperties(this, {
      isVec3: { value: true, writable: false },
    });
  }

  public get width(): number { return this.x; }
  public set width(width: number) { this.x = width; }
  public get height(): number { return this.y; }
  public set height(height: number) { this.y = height; }
  public get depth(): number { return this.z; }
  public set depth(depth: number) { this.z = depth; }
  public get length(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
  public set length(length: number) { this.normalize().mulScalar(length); }

  public set(x: number, y: number, z: number): Vec3 {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    return this;
  }

  public clone(): Vec3 { return new Vec3(this.x, this.y, this.z); }
  public copy(v: Vec3): Vec3 { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  public equals(v: Vec3): boolean { return (this.x === v.x && this.y === v.y && this.z === v.z); }
  // public negate()
  // public reflect()
  public normalize(): Vec3 { return this.divScalar(this.length || 1); }

  public add(v: Vec3): Vec3 { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  public sub(v: Vec3): Vec3 { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  public mul(v: Vec3): Vec3 { this.x *= v.x; this.y *= v.y; this.z *= v.z; return this; }
  public div(v: Vec3): Vec3 { this.x /= v.x; this.y /= v.y; this.z /= v.z; return this; }

  public addScalar(s: number): Vec3 { this.x += s; this.y += s; this.z += s; return this; }
  public subScalar(s: number): Vec3 { this.x -= s; this.y -= s; this.z -= s; return this; }
  public mulScalar(s: number): Vec3 { this.x *= s; this.y *= s; this.z *= s; return this; }
  public divScalar(s: number): Vec3 { this.x /= s; this.y /= s; this.z /= s; return this; }

  // public addScaledVector()
  // public subScaledVector()
  // public mulScaledVector()
  // public divScaledVector()

  // public angleTo()
  // public applyAxisAngle()
  // public applyEuler()
  // public applyQuaternion()
  // public applyMatrix3
  // public applyMatrix4

  public dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public cross(v: Vec3): Vec3 {
    this.x = this.y * v.z - this.z * v.y;
    this.y = this.z * v.x - this.x * v.z;
    this.z = this.x * v.y - this.y * v.x;

    return this;
  }

  // public min()
  public max(v: Vec3): Vec3 { return this.set(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z)); }

  public floor(): Vec3 { return this.set(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z)); }
  public ceil(): Vec3 { return this.set(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z)); }
  // public round()
  // public roundToZero()

  public clamp(min: Vec3, max: Vec3): Vec3 {
    return this.set(clamp(this.x, min.x, max.x), clamp(this.y, min.y, max.y), clamp(this.z, min.z, max.z));
  }
  // public clampScalar()
  // public clampLength()

  // public lengthSquared()
  public lengthManhattan(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  // relative calculations
  public distanceTo(v: Vec3): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public distanceToManhattan(v: Vec3): number {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }

  // public distanceToSquared()

  public lerp(v: Vec3, a: number): Vec3 {
    this.x += (v.x - this.x) * a;
    this.y += (v.y - this.y) * a;
    this.z += (v.z - this.z) * a;

    return this;
  }

  // REVIEW: projection methods
  // project()
  // unproject()
  // projectOnPlane()
  // projectOnVector()

  // REVIEW: possibly redundant methods
  // crossVectors()
  // lerpVectors()

  // REVIEW: array methods
  // fromArray()
  // toArray()
  // fromBufferAttribute() NOTE: for webworker and webgl context transfers
  // toBufferAttribute() NOTE: for webworker and webgl context transfers
  // getComponent() NOTE: simply gets based on index, useful if buffer methods are created
  // setComponent() NOTE: simply sets based on index, useful if buffer methods are created

  // REVIEW: set from other strange constructors
  // setFromCylindrical()
  // setFromCylindricalCoords()
  // setFromMatrixColumn()
  // setFromMatrixPosition()
  // setFromMatrixScale()
  // setFromSpherical()
  // setFromSphereicalCoords()

  // REVIEW: possibly redundant methods
  // transformDirection()

  // REVIEW: possible redundant methods
  // setX()
  // setY()
  // setZ()
}
