// dependencies
import { ArcObject } from './arc-object';
import { Component } from './component';
import { Entity } from './entity';

export class Scene extends ArcObject {
  public readonly isScene: boolean;
  public readonly entities: Entity[];
  public readonly components: Record<string, Entity[]>;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isScene: { writable: false, value: true },
      entities: { writable: false, value: [] },
      components: { writable: false, value: {} },
    });
  }

  public load(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && !this.entities.includes(entity)) {
        if (entity.parent) { entity.parent.unload(entity); entity.detach(); }
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

  public getEntities(...components: Component['constructor'][]): Entity[] {
    return this.entities.filter(
      (entity: Entity): boolean => components.every(
        (component: Component['constructor']): boolean => (
          entity.components[component.name.toLowerCase()] instanceof component
        ),
      ),
    );
  }
}
