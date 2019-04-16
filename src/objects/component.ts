// dependencies
import { ArcObject } from './arc-object';
import { Entity } from './entity';

export class Component extends ArcObject {
  public readonly isComponent: boolean;
  public readonly type: string;
  public parent: Entity;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isComponent: { value: true, writable: false },
      type: { value: this.constructor.name.toLocaleLowerCase(), writable: false },
    });
  }

  public attach(entity: Entity): Component {
    if (entity.isEntity) {
      if (this.parent) { this.parent.unload(this); }
      this.parent = entity;
    }
    return this;
  }

  public detach(): Component {
    if (this.parent) { this.parent.unload(this); }
    this.parent = null;
    return this;
  }
}
