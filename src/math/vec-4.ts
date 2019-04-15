// TODO / REVIEW: 48 methods

export class Vec4 {
  public readonly isVec4: boolean;
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  public constructor(x: number, y: number, z: number, w: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;

    Object.defineProperties(this, {
      isVec4: { value: true, writable: false },
    });
  }

  // get length()
  // set length()
  // get scalar()
  // set scalar()

  // set()
  // setX()
  // setY()
  // setZ()
  // setW()

  // add()
  // sub()
  // mul()
  // div()

  // addScalar()
  // subScalar()
  // mulScalar()
  // divScalar()

  // addVectors()
  // subVectors()
  // mulVectors()
  // divVectors()

  // clone()
  // copy()
  // equals()
  // negate()
  // normalize()

  // dot()

  // lengthManhattan()
  // lengthSquared()

  // max()
  // min()
  // ceil()
  // floor()
  // round()
  // roundToZero()

  // clamp()
  // clampLength()
  // clampScalar()

  // lerp()
  // lerpVectors()

  // setAxisAngleFromQuaternion()
  // setAxisAngleFromRotationMatrix

  // fromArray()
  // toArray()
  // fromBufferAttribute()
  // toBufferAttribute()
  // getComponent()
  // setComponent()
}
