(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ARCCORE = {}));
}(this, function (exports) { 'use strict';

	var canvas2d = {};

	var webgl = {};

	var webgl2 = {};



	var index = /*#__PURE__*/Object.freeze({
		Canvas2D: canvas2d,
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

	exports.Renderer = index;
	exports.Math = index$1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
