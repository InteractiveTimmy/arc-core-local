// dependencies
import { ArcObject } from './arc-object';
import { Component } from './component';
import { Scene } from './scene';

// reused interface
interface CompList { [index: string]: Component }

export class Entity extends ArcObject {
  public readonly isEntity: boolean = true
  protected pParent: Scene
  protected readonly pCompArr: Component[] = []
  protected readonly pCompRef: CompList = {}

  // getters
  public get parent(): Scene { return this.pParent; }
  public get componentList(): Component[] { return [...this.pCompArr]; }
  public get components(): CompList { return { ...this.pCompRef }; }

  public attach(parent: Scene): Entity {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = parent;
    return this;
  }

  public detach(): Entity {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = null;
    return this;
  }

  public load(...components: Component[]): Entity {
    components.forEach((component: Component): void => {
      if (component.isComponent && !this.components[component.type]) {
        this.pCompArr.push(component);
        this.pCompRef[component.type] = component;
        component.attach(this);
        this.pParent.addEntRef(this, component);
      }
    });

    return this;
  }

  public unload(...components: Component[]): Entity {
    components.forEach((component: Component): void => {
      if (component.parent === this || this.pCompArr.includes(component)) {
        this.pCompArr.splice(this.pCompArr.indexOf(component), 1);
        delete this.pCompRef[component.type];
        component.detach();
        this.pParent.subEntRef(this, component);
      }
    });

    return this;
  }
}
