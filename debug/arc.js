(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Arc = {}));
}(this, function (exports) { 'use strict';

	function clamp(value, min, max) {
	    return Math.max(min, Math.min(max, value));
	}

	var math = /*#__PURE__*/Object.freeze({
		clamp: clamp
	});

	class Vec2 {
	    constructor(x, y) {
	        this.x = x || 0;
	        this.y = y || 0;
	        Object.defineProperties(this, {
	            isVec2: { value: true, writable: false },
	        });
	    }
	    get width() { return this.x; }
	    set width(width) { this.x = width; }
	    get height() { return this.y; }
	    set height(height) { this.y = height; }
	    get length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
	    set length(length) { this.normalize().mulScalar(length); }
	    clone() { return new Vec2(this.x, this.y); }
	    copy(v) { this.x = v.x; this.y = v.y; return this; }
	    equals(v) { return ((this.x === v.x) && (this.y === v.y)); }
	    negate() { this.x = -this.x; this.y = -this.y; return this; }
	    normalize() { return this.divScalar(this.length || 1); }
	    add(v) { this.x += v.x; this.y += v.y; return this; }
	    sub(v) { this.x -= v.x; this.y -= v.y; return this; }
	    mul(v) { this.x *= v.x; this.y *= v.y; return this; }
	    div(v) { this.x /= v.x; this.y /= v.y; return this; }
	    addScalar(s) { this.x += s; this.y += s; return this; }
	    subScalar(s) { this.x -= s; this.y -= s; return this; }
	    mulScalar(s) { this.x *= s; this.y *= s; return this; }
	    divScalar(s) { this.x /= s; this.y /= s; return this; }
	    addVectors(v1, v2) { this.x = v1.x + v2.x; this.y = v1.y + v2.y; return this; }
	    subVectors(v1, v2) { this.x = v1.x - v2.x; this.y = v1.y - v2.y; return this; }
	    mulVectors(v1, v2) { this.x = v1.x * v2.x; this.y = v1.y * v2.y; return this; }
	    divVectors(v1, v2) { this.x = v1.x / v2.x; this.y = v1.y / v2.y; return this; }
	    lengthSquared() { return this.x * this.x + this.y * this.y; }
	    lengthManhattan() { return Math.abs(this.x) + Math.abs(this.y); }
	    dot(v) { return this.x * v.x + this.y * v.y; }
	    cross(v) { return this.x * v.y - this.y * v.x; }
	    min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); return this; }
	    max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); return this; }
	    floor() { this.x = Math.floor(this.x); this.y = Math.floor(this.y); return this; }
	    ceil() { this.x = Math.ceil(this.x); this.y = Math.ceil(this.y); return this; }
	    round() { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
	    roundToZero() {
	        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
	        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
	        return this;
	    }
	    clamp(min, max) {
	        this.x = clamp(this.x, min.x, max.x);
	        this.y = clamp(this.y, min.y, max.y);
	        return this;
	    }
	    clampScalar(min, max) {
	        this.x = clamp(this.x, min, max);
	        this.y = clamp(this.x, min, max);
	        return this;
	    }
	    clampLength(min, max) {
	        return this.divScalar(this.length || 1).mulScalar(clamp(this.length, min, max));
	    }
	    distanceTo(v) {
	        const dx = this.x - v.x;
	        const dy = this.y - v.y;
	        return Math.sqrt(dx * dx + dy * dy);
	    }
	    distanceToSquared(v) {
	        const dx = this.x - v.x;
	        const dy = this.y - v.y;
	        return dx * dx + dy * dy;
	    }
	    distanceToManhattan(v) {
	        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	    }
	    lerp(v, a) {
	        this.x += (v.x - this.x) * a;
	        this.y += (v.y - this.y) * a;
	        return this;
	    }
	    angle() {
	        let angle = Math.atan2(this.y, this.x);
	        if (angle < 0) {
	            angle += 2 * Math.PI;
	        }
	        return angle;
	    }
	    rotateAround(center, angle) {
	        const c = Math.cos(angle);
	        const s = Math.sin(angle);
	        const x = this.x - center.x;
	        const y = this.y - center.y;
	        this.x = x * c - y * s + center.x;
	        this.y = x * s + y * c + center.y;
	        return this;
	    }
	}

	class Vec3 {
	    constructor(buffer) {
	        Object.defineProperties(this, {
	            isVec3: { writable: false, value: true },
	            pSharedBuffer: { writable: false, value: buffer || new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT * 3) },
	            pArrayBuffer: { writable: false, value: new Float64Array(this.pSharedBuffer) },
	        });
	        Object.seal(this);
	    }
	    get x() { return this.pArrayBuffer[0]; }
	    set x(value) { this.pArrayBuffer[0] = value; }
	    get y() { return this.pArrayBuffer[1]; }
	    set y(value) { this.pArrayBuffer[1] = value; }
	    get z() { return this.pArrayBuffer[2]; }
	    set z(value) { this.pArrayBuffer[2] = value; }
	    get length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
	    set length(length) { this.normalize().mulScalar(length); }
	    set(x, y, z) {
	        this.pArrayBuffer[0] = x || 0;
	        this.pArrayBuffer[1] = y || 0;
	        this.pArrayBuffer[2] = z || 0;
	        return this;
	    }
	    clone() {
	        const buffer = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT * 3);
	        const v = new Vec3(buffer);
	        v.set(this.pArrayBuffer[0], this.pArrayBuffer[1], this.pArrayBuffer[2]);
	        return v;
	    }
	    copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
	    equals(v) { return (this.x === v.x && this.y === v.y && this.z === v.z); }
	    normalize() { return this.divScalar(this.length || 1); }
	    add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
	    sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
	    mul(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; return this; }
	    div(v) { this.x /= v.x; this.y /= v.y; this.z /= v.z; return this; }
	    addScalar(s) { this.x += s; this.y += s; this.z += s; return this; }
	    subScalar(s) { this.x -= s; this.y -= s; this.z -= s; return this; }
	    mulScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
	    divScalar(s) { this.x /= s; this.y /= s; this.z /= s; return this; }
	    dot(v) {
	        return this.x * v.x + this.y * v.y + this.z * v.z;
	    }
	    cross(v) {
	        this.x = this.y * v.z - this.z * v.y;
	        this.y = this.z * v.x - this.x * v.z;
	        this.z = this.x * v.y - this.y * v.x;
	        return this;
	    }
	    max(v) { return this.set(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z)); }
	    floor() { return this.set(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z)); }
	    ceil() { return this.set(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z)); }
	    clamp(min, max) {
	        return this.set(clamp(this.x, min.x, max.x), clamp(this.y, min.y, max.y), clamp(this.z, min.z, max.z));
	    }
	    lengthManhattan() {
	        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	    }
	    distanceTo(v) {
	        const dx = this.x - v.x;
	        const dy = this.y - v.y;
	        const dz = this.z - v.z;
	        return Math.sqrt(dx * dx + dy * dy + dz * dz);
	    }
	    distanceToManhattan(v) {
	        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
	    }
	    lerp(v, a) {
	        this.x += (v.x - this.x) * a;
	        this.y += (v.y - this.y) * a;
	        this.z += (v.z - this.z) * a;
	        return this;
	    }
	}

	class Vec4 {
	    constructor(x, y, z, w) {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	        this.w = w || 0;
	        Object.defineProperties(this, {
	            isVec4: { value: true, writable: false },
	        });
	    }
	}

	class Euler {
	    constructor(x, y, z, order) {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	        this.order = order || 'XYZ';
	        Object.assign(this, {
	            isEuler: { value: true, writable: false },
	        });
	    }
	}

	class Quat {
	    constructor(x, y, z, w) {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	        this.w = (w !== undefined) ? w : 1;
	        Object.defineProperties(this, {
	            isQuat: { value: true, writable: false },
	        });
	    }
	}

	class Mat3 {
	    constructor() {
	        this.elms = [];
	        Object.defineProperties(this, {
	            isMat3: { value: true, writable: false },
	        });
	    }
	}

	class Mat4 {
	    constructor() {
	        this.elms = [];
	        Object.defineProperties(this, {
	            isMat4: { value: true, writable: false },
	        });
	    }
	}

	const lut = [];
	for (let i = 0; i < 256; i += 1) {
	    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
	}
	function uuid() {
	    const d0 = (Math.random() * 0xffffffff) | 0;
	    const d1 = (Math.random() * 0xffffffff) | 0;
	    const d2 = (Math.random() * 0xffffffff) | 0;
	    const d3 = (Math.random() * 0xffffffff) | 0;
	    return (lut[d0 & 0xff] + lut[(d0 >> 8) & 0xff] + lut[(d0 >> 16) & 0xff] + lut[(d0 >> 24) & 0xff] + '-'
	        + lut[d1 & 0xff] + lut[(d1 >> 8) & 0xff] + '-' + lut[((d1 >> 16) & 0x0f) | 0x40] + lut[(d1 >> 24) & 0xff] + '-'
	        + lut[(d2 & 0x3f) | 0x80] + lut[(d2 >> 8) & 0xff] + '-' + lut[(d2 >> 16) & 0xff] + lut[(d2 >> 24) & 0xff]
	        + lut[d3 & 0xff] + lut[(d3 >> 8) & 0xff] + lut[(d3 >> 16) & 0xff] + lut[(d3 >> 24) & 0xff]).toUpperCase();
	}

	class ArcObject {
	    constructor() {
	        Object.defineProperties(this, {
	            isArcObject: { writable: false, value: true },
	            uuid: { writable: false, value: uuid() },
	        });
	    }
	}

	class Component extends ArcObject {
	    constructor() {
	        super();
	        Object.defineProperties(this, {
	            isComponent: { value: true, writable: false },
	            type: { value: this.constructor.name.toLocaleLowerCase(), writable: false },
	        });
	    }
	    get parent() { return this.pParent; }
	    attach(entity) {
	        if (entity.isEntity && !this.pParent) {
	            this.pParent = entity;
	        }
	        return this;
	    }
	    detach() {
	        if (this.pParent) {
	            this.pParent = null;
	        }
	        return this;
	    }
	}

	class Entity extends ArcObject {
	    constructor() {
	        super();
	        Object.defineProperties(this, {
	            isEntity: { writable: false, value: true },
	            components: { writable: false, value: {} },
	        });
	    }
	    get parent() { return this.pParent; }
	    attach(scene) {
	        if (scene.isScene && !this.pParent) {
	            this.pParent = scene;
	        }
	        return this;
	    }
	    detach() {
	        if (this.pParent) {
	            this.pParent = null;
	        }
	        return this;
	    }
	    load(...components) {
	        components.forEach((component) => {
	            if (component.isComponent && !this.components[component.type]) {
	                if (component.parent) {
	                    component.parent.unload(component);
	                    component.detach();
	                }
	                this.components[component.type] = component;
	                component.attach(this);
	                if (this.pParent) {
	                    this.pParent.index(this, component);
	                }
	            }
	        });
	        return this;
	    }
	    unload(...components) {
	        components.forEach((component) => {
	            if (component.isComponent && this.components[component.type] === component) {
	                if (component.parent === this) {
	                    component.detach();
	                }
	                delete this.components[component.type];
	            }
	        });
	        return this;
	    }
	}

	class Scene extends ArcObject {
	    constructor() {
	        super();
	        Object.defineProperties(this, {
	            isScene: { writable: false, value: true },
	            entities: { writable: false, value: [] },
	            components: { writable: false, value: {} },
	        });
	    }
	    index(entity, component) {
	        if (component) {
	            const key = component.constructor.name;
	            if (!this.components[key]) {
	                this.components[key] = [];
	            }
	            this.components[key].push(entity);
	        }
	        else {
	            Object.keys(entity.components).forEach((key) => {
	                if (!this.components[key]) {
	                    this.components[key] = [];
	                }
	                if (!this.components[key].includes(entity)) {
	                    this.components[key].push(entity);
	                }
	            });
	        }
	        return this;
	    }
	    unindex(entity, component) {
	        if (component) {
	            const key = component.constructor.name;
	            if (!this.components[key]) {
	                this.components[key] = [];
	            }
	            this.components[key].splice(this.components[key].indexOf(entity), 1);
	        }
	        else {
	            Object.keys(entity.components).forEach((key) => {
	                if (!this.components[key]) {
	                    this.components[key] = [];
	                }
	                if (this.components[key].includes(entity)) {
	                    this.components[key].splice(this.components[key].indexOf(entity), 1);
	                }
	            });
	        }
	        return this;
	    }
	    load(...entities) {
	        entities.forEach((entity) => {
	            if (entity.isEntity && !this.entities.includes(entity)) {
	                if (entity.parent) {
	                    entity.parent.unload(entity);
	                    entity.detach();
	                }
	                this.index(entity);
	                this.entities.push(entity);
	                entity.attach(this);
	            }
	        });
	        return this;
	    }
	    unload(...entities) {
	        entities.forEach((entity) => {
	            if (entity.isEntity && this.entities.includes(entity)) {
	                if (entity.parent === this) {
	                    entity.detach();
	                }
	                this.unindex(entity);
	                this.entities.splice(this.entities.indexOf(entity), 1);
	            }
	        });
	        return this;
	    }
	    getEntities(...components) {
	        const keys = components.map((component) => component.name.toLowerCase());
	        return this.entities.filter((entity) => keys.every((key) => key in entity.components));
	    }
	}

	class System extends ArcObject {
	    constructor() {
	        super();
	        Object.defineProperties(this, {
	            isSystem: { value: true, writable: false },
	        });
	    }
	    get parent() { return this.pParent; }
	    attach(instance) {
	        if (instance.isInstance && !this.pParent) {
	            this.pParent = instance;
	        }
	        return this;
	    }
	    detach() {
	        if (this.pParent) {
	            this.pParent = null;
	        }
	        return this;
	    }
	}

	class Instance extends ArcObject {
	    constructor() {
	        super();
	        Object.defineProperties(this, {
	            isInstance: { writable: false, value: true },
	            systems: { writable: false, value: [] },
	        });
	        this.dt = 0;
	        this.dts = 0;
	    }
	    load(...systems) {
	        systems.forEach((system) => {
	            if (system.isSystem && !this.systems.includes(system)) {
	                if (system.parent) {
	                    system.parent.unload(system);
	                    system.detach();
	                }
	                this.systems.push(system);
	                system.attach(this);
	            }
	        });
	        return this;
	    }
	    unload(...systems) {
	        systems.forEach((system) => {
	            if (system.isSystem && this.systems.includes(system)) {
	                if (system.parent === this) {
	                    system.detach();
	                }
	                this.systems.splice(this.systems.indexOf(system), 1);
	            }
	        });
	        return this;
	    }
	    update(scene) {
	        this.dt = (performance.now() - this.dts) / 1000;
	        this.dts = performance.now();
	        this.systems.forEach((system) => {
	            system.update(scene, this.dt);
	        });
	    }
	}



	var index = /*#__PURE__*/Object.freeze({
		math: math,
		uuid: uuid
	});



	var core = /*#__PURE__*/Object.freeze({
		Vec2: Vec2,
		Vec3: Vec3,
		Vec4: Vec4,
		Euler: Euler,
		Quat: Quat,
		Mat3: Mat3,
		Mat4: Mat4,
		ArcObject: ArcObject,
		Component: Component,
		Entity: Entity,
		Scene: Scene,
		System: System,
		Instance: Instance,
		utils: index
	});

	exports.core = core;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
