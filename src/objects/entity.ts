// dependencies
import { ArcObject } from './arc-object';
import { Component } from './component';
import { Scene } from './scene';

export class Entity extends ArcObject {
  public readonly isEntity: boolean;
  public parent: Scene;
  public readonly components: { [index: string]: Component };

  public constructor() {
    super();

    Object.defineProperties(this, {
      isEntity: { value: true, writable: false },
      components: { value: {}, writable: false },
    });
  }

  public attach(scene: Scene): Entity {
    if (this.parent) { this.parent.unload(this); }
    this.parent = scene;
    return this;
  }

  public detach(): Entity {
    if (this.parent) { this.parent.unload(this); }
    this.parent = null;
    return this;
  }

  public load(...components: Component[]): Entity {
    components.forEach((component: Component): void => {
      if (component.isComponent && !this.components[component.type]) {
        if (component.parent) { component.detach(); }
        this.components[component.type] = component;
        component.attach(this);
      }
    });
    return this;
  }

  public unload(...components: Component[]): Entity {
    components.forEach((component: Component): void => {
      if (component.isComponent && this.components[component.type] === component) {
        if (component.parent === this) { component.detach(); }
        delete this.components[component.type];
      }
    });
    return this;
  }
}
