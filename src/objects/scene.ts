// dependencies
import { ArcObject } from './arc-object';
import { Component } from './component';
import { Entity } from './entity';

export class Scene extends ArcObject {
  public readonly isScene: boolean;
  public readonly entities: Entity[];

  public constructor() {
    super();

    Object.defineProperties(this, {
      isScene: { value: true, writable: false },
      entities: { value: [], writable: false },
    });
  }

  public getEntities(...components: (() => Component)[]): Entity[] {
    return this.entities.filter(
      (entity: Entity): boolean => components.every(
        (component: (() => Component)): boolean => (
          entity.components[component.name.toLowerCase()] !== undefined
        ),
      ),
    );
  }

  public load(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && !this.entities.includes(entity)) {
        if (entity.parent) { entity.detach(); }
        this.entities.push(entity);
        entity.attach(this);
      }
    });
    return this;
  }

  public unload(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && this.entities.includes(entity)) {
        if (entity.parent === this) { entity.detach(); }
        this.entities.splice(this.entities.indexOf(entity), 1);
      }
    });
    return this;
  }
}
