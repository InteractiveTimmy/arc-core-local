import ArcObject from './arc-object';
import Entity from './entity';

class Component extends ArcObject {
  public readonly isComponent: boolean = true
  public parent: Entity

  public loadParent(parent: Entity): Component {
    this.unloadParent();
    this.parent = parent;

    return this;
  }

  public unloadParent(): Component {
    if (this.parent) {
      this.parent.unload(this);
      this.parent = null;
    }

    return this;
  }
}

export default Component;
