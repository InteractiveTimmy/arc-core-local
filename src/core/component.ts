// dependencies
import { ArcObject } from './arc-object';
import { Entity } from './entity';

export class Component extends ArcObject {
  public readonly isComponent: boolean = true
  public readonly type: string = this.constructor.name.toLowerCase()
  protected pParent: Entity

  public get parent(): Entity {
    return this.pParent;
  }

  public attach(parent: Entity): Component {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = parent;
    return this;
  }

  public detach(): Component {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = null;
    return this;
  }
}
