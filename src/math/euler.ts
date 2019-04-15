// TODO / REVIEW: 15 methods

export class Euler {
  public readonly isEuler: boolean;
  public x: number;
  public y: number;
  public z: number;
  public order: string; // TODO: give this a type for possible order

  public constructor(x: number, y: number, z: number, order: string) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.order = order || 'XYZ';

    Object.assign(this, {
      isEuler: { value: true, writable: false },
    });
  }

  // onChange() // NOTE: links to quaternion
  // onChangeCallback() // NOTE: links to quaternion

  // set()
  // reorder()
  // setFromRotationMatrix()
  // setFromQuaternion()
  // setFromVec3()

  // copy()
  // clone()
  // equals()

  // toVec3();

  // fromArray()
  // toArray()
  // fromBufferAttribute()
  // toBufferAttribute()
}
