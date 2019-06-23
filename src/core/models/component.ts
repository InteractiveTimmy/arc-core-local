import { ArcObject } from './arc-object';
import { Entity } from './entity';

export class Component extends ArcObject {
  public readonly isComponent: boolean;
  public readonly type: string;
  protected pParent: Entity;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isComponent: { value: true, writable: false },
      type: { value: this.constructor.name.toLocaleLowerCase(), writable: false },
    });
  }

  public get parent(): Entity { return this.pParent; }

  public attach(entity: Entity): Component {
    if (entity.isEntity && !this.pParent) { this.pParent = entity; }
    return this;
  }

  public detach(): Component {
    if (this.pParent) { this.pParent = null; }
    return this;
  }
}
