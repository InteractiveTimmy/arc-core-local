export class Mat3 {
  public readonly elms: number[]; // REVIEW: to be 'elms' or 'elements'
  public readonly isMat3: boolean;

  public constructor() {
    this.elms = [];

    Object.defineProperties(this, {
      isMat3: { value: true, writable: false },
    });
  }

  // set()

  // mul()
  // mulPre()
  // mulMatrices()
  // mulScalar()

  // clone()
  // copy()
  // equals()
  // identity()

  // transpose()
  // transposeIntoArray()

  // getInverse()
  // getNormalMatrix()

  // setFromMat4()
  // setUVTransform()

  // determinant()

  // fromArray()
  // toArray() // NOTE: may not be necessary, stored in property
  // fromBufferAttribute()
  // toBufferAttribute()
}
