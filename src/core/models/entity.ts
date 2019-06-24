import { ArcObject } from './arc-object';
import { Component } from './component';
import { Scene } from './scene';

export class Entity extends ArcObject {
  public readonly isEntity: boolean;
  public readonly components: Record<string, Component>;
  protected pParent: Scene;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isEntity: { writable: false, value: true },
      components: { writable: false, value: {} },
    });
  }

  public get parent(): Scene { return this.pParent; }

  public attach(scene: Scene): Entity {
    if (scene.isScene && !this.pParent) { this.pParent = scene; }

    return this;
  }

  public detach(): Entity {
    if (this.pParent) { this.pParent = null; }

    return this;
  }

  public load(...components: Component[]): Entity {
    components.forEach((component: Component): void => {
      if (component.isComponent && !this.components[component.type]) {
        if (component.parent) { component.parent.unload(component); component.detach(); }
        this.components[component.type] = component;
        component.attach(this);
        if (this.pParent) { this.pParent.index(this, component); }
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
