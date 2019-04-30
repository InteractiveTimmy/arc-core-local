// TODO / REVIEW: 26 methods

export class Quat {
  public readonly isQuat: boolean;
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  public constructor(x?: number, y?: number, z?: number, w?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = (w !== undefined) ? w : 1;

    Object.defineProperties(this, {
      isQuat: { value: true, writable: false },
    });
  }

  // onChange() // NOTE: links to euler
  // onChangeCallback() // NOTE: links to euler

  // set()
  // setFromAxis()
  // setFromEuler()
  // setFromRotationMatrix()
  // setFromUnitVectors()

  // angleTo()
  // rotateTowards()

  // clone()
  // copy()
  // equals()
  // inverse()
  // normalize()

  // mul()
  // mulPre()
  // mulQuaternions()

  // length()
  // lengthSquared()

  // dot()
  // sLerp() // NOTE: could be static method

  // conjugate()

  // fromArray()
  // toArray()
  // toBufferAttribute()
  // fromBufferAttribute()
}
