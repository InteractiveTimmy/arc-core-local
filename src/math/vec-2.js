class Vec2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // getters and setters
  get width() {
    return this.x;
  }

  set width(value) {
    this.x = value;
  }

  get height() {
    return this.y;
  }

  set height(value) {
    this.y = value;
  }

  // assignment
  set(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    return this;
  }

  // duplication
  clone() {
    return new this.constructor(this.x, this.y);
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  // base math
  add(v) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  mul(v) {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  div(v) {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  // scalar math
  addScalar(s) {
    this.x += s;
    this.y += s;

    return this;
  }

  subScalar(s) {
    this.x -= s;
    this.y -= s;

    return this;
  }

  mulScalar(s) {
    this.x *= s;
    this.y *= s;

    return this;
  }

  divScalar(s) {
    this.x /= s;
    this.y /= s;

    return this;
  }
}

export default Vec2;
