class Vec3 {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  // assignment
  set(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    return this;
  }

  // duplication
  clone() {
    return this.constructor(this.x, this.y, this.z);
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }

  // base math
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }

  mul(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;

    return this;
  }

  div(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;

    return this;
  }

  // scalar math
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;

    return this;
  }

  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;

    return this;
  }

  mulScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
  }

  divScalar(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;

    return this;
  }
}

export default Vec3;
