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

  public index(entity: Entity, component?: Component): Scene {
    if (component) {
      const key = component.constructor.name;
      if (!this.components[key]) { this.components[key] = []; }
      this.components[key].push(entity);
    } else {
      Object.keys(entity.components).forEach((key: string): void => {
        if (!this.components[key]) { this.components[key] = []; }
        if (!this.components[key].includes(entity)) { this.components[key].push(entity); }
      });
    }

    return this;
  }

  public unindex(entity: Entity, component?: Component): Scene {
    if (component) {
      const key = component.constructor.name;
      if (!this.components[key]) { this.components[key] = []; }
      this.components[key].splice(this.components[key].indexOf(entity), 1);
    } else {
      Object.keys(entity.components).forEach((key: string): void => {
        if (!this.components[key]) { this.components[key] = []; }
        if (this.components[key].includes(entity)) {
          this.components[key].splice(this.components[key].indexOf(entity), 1);
        }
      });
    }

    return this;
  }

  public load(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && !this.entities.includes(entity)) {
        if (entity.parent) { entity.parent.unload(entity); entity.detach(); }
        this.index(entity);
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
        this.unindex(entity);
        this.entities.splice(this.entities.indexOf(entity), 1);
      }
    });

    return this;
  }

  public getEntities(...components: Component['constructor'][]): Entity[] {
    const keys = components.map(
      (component: Component['constructor']): string => component.name.toLowerCase(),
    );

    return this.entities.filter(
      (entity: Entity): boolean => keys.every(
        (key: string): boolean => key in entity.components,
      ),
    );
  }
}
