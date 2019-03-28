/* eslint-disable class-methods-use-this */

import ArcObject from './arc-object';
import Component from './component';
import Entity from './entity';
import System from './system';

import { Stats, Reference } from '../types/interfaces/index';

class Instance extends ArcObject {
  public readonly isInstance: boolean = true

  public components: Component[] = []
  public entities: Entity[] = []
  public systems: System[] = []

  public refComponents: Reference<Component> = {}
  public refEntities: Reference<Entity> = {}
  public refSystems: Reference<System> = {}

  public stats: Stats = {
    ready: false,
    active: false,
    prevTime: 0,
    deltaTime: 0,
  }

  protected step(): void {
    if (!this.stats.active) { return null; }

    this.stats.deltaTime = window.performance.now() - this.stats.prevTime;
    this.stats.prevTime = window.performance.now();

    // eslint-disable-next-line no-console
    console.log(this.stats.deltaTime);

    this.systems.forEach((system: System) => {
      system.step(this.stats.deltaTime);
    });

    setTimeout(() => { this.step(); }, 0);
    return null;
  }

  public start(): Instance {
    if (!this.stats.active) {
      this.stats.active = true;
      this.step();
    }

    return this;
  }

  public stop(): Instance {
    if (this.stats.active) { this.stats.active = false; }
    return this;
  }

  public loadEntity(...entities: Entity[]): Instance {
    let entUUID: string;
    let compUUID: string;

    entities.forEach((entity) => {
      entUUID = entity.uuid;

      if (!this.refEntities[entUUID]) {
        entity.loadParent(this);

        this.systems.forEach((system) => {
          if (system.canLoad(entity)) {
            system.loadEntity(entity);
          }
        });

        entity.components.forEach((component) => {
          compUUID = component.uuid;

          this.refComponents[compUUID] = component;
          this.components.push(component);
        });

        this.refEntities[entUUID] = entity;
        this.entities.push(entity);
      }
    });

    return this;
  }

  public unloadEntity(...entities: Entity[]): Instance {
    let entUUID: string;
    let compUUID: string;

    entities.forEach((entity) => {
      entUUID = entity.uuid;

      if (this.refEntities[entUUID]) {
        entity.unloadParent();

        this.systems.forEach((system) => {
          if (system.entities.includes(entity)) {
            system.unloadEntity(entity);
          }
        });

        entity.components.forEach((component) => {
          compUUID = component.uuid;

          delete this.refComponents[compUUID];
          this.components.splice(this.components.indexOf(component), 1);
        });

        delete this.refEntities[entUUID];
        this.entities.splice(this.entities.indexOf(entity), 1);
      }
    });

    return this;
  }

  public loadSystem(...systems: System[]): Instance {
    let sysUUID: string;

    systems.forEach((system) => {
      sysUUID = system.uuid;

      if (!this.refSystems[sysUUID]) {
        system.loadEntity(...this.entities);

        this.refSystems[sysUUID] = system;
        this.systems.push(system);
      }
    });

    return this;
  }

  public unloadSystem(...systems: System[]): Instance {
    let sysUUID: string;

    systems.forEach((system) => {
      sysUUID = system.uuid;

      if (this.refSystems[sysUUID]) {
        system.unloadEntity(...system.entities);

        delete this.refSystems[sysUUID];
        this.systems.splice(this.systems.indexOf(system), 1);
      }
    });
    return this;
  }
}

export default Instance;
