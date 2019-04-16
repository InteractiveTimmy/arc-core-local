import { clamp } from '../utils/math';

// REVIEW: 8 methods
// TODO: 1 method

export class Vec2 {
  public readonly isVec2: boolean;
  public x: number;
  public y: number;

  public constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;

    Object.defineProperties(this, {
      isVec2: { value: true, writable: false },
    });
  }

  public get width(): number { return this.x; }
  public set width(width: number) { this.x = width; }
  public get height(): number { return this.y; }
  public set height(height: number) { this.y = height; }
  public get length(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
  public set length(length: number) { this.normalize().mulScalar(length); }

  public clone(): Vec2 { return new Vec2(this.x, this.y); }
  public copy(v: Vec2): Vec2 { this.x = v.x; this.y = v.y; return this; }
  public equals(v: Vec2): boolean { return ((this.x === v.x) && (this.y === v.y)); }
  public negate(): Vec2 { this.x = -this.x; this.y = -this.y; return this; }
  public normalize(): Vec2 { return this.divScalar(this.length || 1); }

  public add(v: Vec2): Vec2 { this.x += v.x; this.y += v.y; return this; }
  public sub(v: Vec2): Vec2 { this.x -= v.x; this.y -= v.y; return this; }
  public mul(v: Vec2): Vec2 { this.x *= v.x; this.y *= v.y; return this; }
  public div(v: Vec2): Vec2 { this.x /= v.x; this.y /= v.y; return this; }

  public addScalar(s: number): Vec2 { this.x += s; this.y += s; return this; }
  public subScalar(s: number): Vec2 { this.x -= s; this.y -= s; return this; }
  public mulScalar(s: number): Vec2 { this.x *= s; this.y *= s; return this; }
  public divScalar(s: number): Vec2 { this.x /= s; this.y /= s; return this; }

  public addVectors(v1: Vec2, v2: Vec2): Vec2 { this.x = v1.x + v2.x; this.y = v1.y + v2.y; return this; }
  public subVectors(v1: Vec2, v2: Vec2): Vec2 { this.x = v1.x - v2.x; this.y = v1.y - v2.y; return this; }
  public mulVectors(v1: Vec2, v2: Vec2): Vec2 { this.x = v1.x * v2.x; this.y = v1.y * v2.y; return this; }
  public divVectors(v1: Vec2, v2: Vec2): Vec2 { this.x = v1.x / v2.x; this.y = v1.y / v2.y; return this; }

  public lengthSquared(): number { return this.x * this.x + this.y * this.y; }
  public lengthManhattan(): number { return Math.abs(this.x) + Math.abs(this.y); }

  public dot(v: Vec2): number { return this.x * v.x + this.y * v.y; }
  public cross(v: Vec2): number { return this.x * v.y - this.y * v.x; }

  public min(v: Vec2): Vec2 { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); return this; }
  public max(v: Vec2): Vec2 { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); return this; }

  public floor(): Vec2 { this.x = Math.floor(this.x); this.y = Math.floor(this.y); return this; }
  public ceil(): Vec2 { this.x = Math.ceil(this.x); this.y = Math.ceil(this.y); return this; }
  public round(): Vec2 { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }

  public roundToZero(): Vec2 {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    return this;
  }

  public clamp(min: Vec2, max: Vec2): Vec2 {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    return this;
  }

  public clampScalar(min: number, max: number): Vec2 {
    this.x = clamp(this.x, min, max);
    this.y = clamp(this.x, min, max);
    return this;
  }

  public clampLength(min: number, max: number): Vec2 {
    return this.divScalar(this.length || 1).mulScalar(clamp(this.length, min, max));
  }

  public distanceTo(v: Vec2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public distanceToSquared(v: Vec2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  public distanceToManhattan(v: Vec2): number {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }

  public lerp(v: Vec2, a: number): Vec2 {
    this.x += (v.x - this.x) * a;
    this.y += (v.y - this.y) * a;
    return this;
  }

  public angle(): number {
    let angle = Math.atan2(this.y, this.x);
    if (angle < 0) { angle += 2 * Math.PI; }
    return angle;
  }

  public rotateAround(center: Vec2, angle: number): Vec2 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;

    return this;
  }

  // REVIEW: Array Methods
  // fromArray()
  // toArray()
  // fromBufferAttribute() NOTE: for webworker and webgl context transfers
  // toBufferAttribute() NOTE: for webworker and webgl context transfers
  // getComponent() NOTE: simply gets based on index, useful if buffer methods are created
  // setComponent() NOTE: simply sets based on index, useful if buffer methods are created

  // REVIEW: possibly unnecessary methods
  // lerpVectors()
  // setScalar()
  // crossVectors()

  // TODO: needs to be created after Mat3 class is generated
  // applyMatrix3() NOTE: applies Mat3 to Vec2
}
