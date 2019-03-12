class Canvas2D {
  constructor() {
    this.elm = document.createElement('canvas');
    this.ctx = this.element.getContext('2d');
    this.accuracy = 32;
  }

  render(scene, view) {
    scene.children.forEach((child) => {
      // do some stuff to render the child object
      // be sure to check z-buffer
      // be sure to check if object is in view [cull]
    });

    return this;
  }
}

var webgl = {};

var webgl2 = {};



var index = /*#__PURE__*/Object.freeze({
	Canvas2D: Canvas2D,
	WebGL: webgl,
	WebGL2: webgl2
});

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



var index$1 = /*#__PURE__*/Object.freeze({
	Vec2: Vec2,
	Vec3: Vec3
});

var arcObject = {};

var component = {};

var entity = {};

var system = {};

var instance = {};



var index$2 = /*#__PURE__*/Object.freeze({
	ArcObject: arcObject,
	Component: component,
	Entity: entity,
	System: system,
	Instance: instance
});

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
// https://github.com/mrdoob/three.js/blob/dev/src/math/Math.js

/* eslint-disable no-bitwise, no-mixed-operators, prefer-template */
const lut = [];

for (let i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

function uuid() {
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;

  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-'
    + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-'
    + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff]
    + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    .toUpperCase();
}



var index$3 = /*#__PURE__*/Object.freeze({
	uuid: uuid
});

export { index as renderers, index$1 as math, index$2 as core, index$3 as utils };
