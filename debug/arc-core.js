(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ArcCore = {}));
}(this, function (exports) { 'use strict';

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
	            isArcObject: { value: true, writable: false },
	            uuid: { value: uuid(), writable: false },
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
	            isEntity: { value: true, writable: false },
	            components: { value: {}, writable: false },
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
	            isScene: { value: true, writable: false },
	            entities: { value: [], writable: false },
	        });
	    }
	    getEntities(...components) {
	        return this.entities.filter((entity) => components.every((component) => (entity.components[component.name.toLowerCase()] instanceof component)));
	    }
	    load(...entities) {
	        entities.forEach((entity) => {
	            if (entity.isEntity && !this.entities.includes(entity)) {
	                if (entity.parent) {
	                    entity.parent.unload(entity);
	                    entity.detach();
	                }
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
	                this.entities.splice(this.entities.indexOf(entity), 1);
	            }
	        });
	        return this;
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
	    update(scene, dt) { }
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
	        this.dt = 0;
	        this.dts = 0;
	        Object.defineProperties(this, {
	            isInstance: { value: true, writable: false },
	            systems: { value: [], writable: false },
	        });
	    }
	    update(scene) {
	        this.dt = (performance.now() - this.dts) / 1000;
	        this.dts = performance.now();
	        this.systems.forEach((system) => {
	            system.update(scene, this.dt);
	        });
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
	}



	var index = /*#__PURE__*/Object.freeze({
		ArcObject: ArcObject,
		Component: Component,
		Entity: Entity,
		Scene: Scene,
		System: System,
		Instance: Instance
	});

	exports.objects = index;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
