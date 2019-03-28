import ArcObject from './arc-object';
import Component from './component';
import Instance from './instance';

interface Reference<T> {
  [index: string]: T;
}

class Entity extends ArcObject {
  public readonly isEntity: boolean = true
  public components: Component[] = []
  public parent: Instance
  public reference: Reference<Component> = {}

  public load(...components: Component[]): Entity {
    let compName: string;

    components.forEach((component) => {
      compName = component.constructor.name;

      if (!this.reference[compName]) {
        component.loadParent(this);

        this.reference[compName] = component;
        this.components.push(component);
      }
    });

    return this;
  }

  public unload(...components: Component[]): Entity {
    let compName: string;

    components.forEach((component) => {
      compName = component.constructor.name;

      if (this.reference[compName]) {
        component.unloadParent();

        delete this.reference[compName];
        this.components.splice(this.components.indexOf(component), 1);
      }
    });

    return this;
  }

  public loadParent(parent: Instance): Entity {
    this.unloadParent();
    this.parent = parent;

    return this;
  }

  public unloadParent(): Entity {
    if (this.parent) {
      // this.parent.unloadEntity(this);
      this.parent = null;
    }

    return this;
  }
}

export default Entity;
