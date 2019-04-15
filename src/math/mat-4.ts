// TODO / REVIEW: 37 methods

export class Mat4 {
  public readonly isMat4: boolean;
  public readonly elms: number[]; // REVIEW: to be 'elms' or 'elements'

  public constructor() {
    this.elms = [];

    Object.defineProperties(this, {
      isMat4: { value: true, writable: false },
    });
  }
  // set()
  // identity()
  // transpose()

  // lookAt()
  // makeRotationAxis()

  // fromArray()
  // toArray() // NOTE: may be redundant
  // fromBufferAttribute()
  // toBufferAttribute()
  // applyToBufferAttribute

  // clone()
  // copy()
  // equals()
  // getInverse()

  // getMaxScaleOnAxis()

  // compose() NOTE: composes Mat4 from position: Vec3, quaternion: Quat, and scale: Vec3
  // decompose() NOTE: decomposes Mat4 into position: Vec3, quaternion: Quat, and scale: Vec3
  // extractBasis() NOTE: extracts Mat4 into three Vec3s
  // extractRotation() NOTE: extracts Mat4 into Rotation Mat4

  // makeBasis()
  // makePerspective()
  // makeOrthographic()
  // makeRotationFromEuler()
  // makeRotationFromQuaternion()

  // makeRotationX()
  // makeRotationY()
  // makeRotationZ()
  // makeScale()
  // makeShear()
  // makeTranslation()

  // mul()
  // mulPre()
  // mulScalar()

  // scale()

  // determinant()

  // setPosition()
  // copyPosition()
}
