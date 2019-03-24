/* eslint-disable class-methods-use-this */

import ArcObject from './arc-object';
import Component from './component';
import Entity from './entity';
import System from './system';

interface Stats {
  ready: boolean;
  active: boolean;
  prevTime: number;
  deltaTime: number;
}

class Instance extends ArcObject {
  public readonly isInstance: boolean = true

  public components: Component[] = []
  public entities: Entity[] = []
  public systems: System[] = []

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

  public start(): void {
    if (!this.stats.active) {
      this.stats.active = true;
      this.step();
    }
  }

  public stop(): void {
    if (this.stats.active) { this.stats.active = false; }
  }

  public loadEntity(...entities: Entity[]): Instance {
    entities.forEach((entity) => {
      if (!this.entities.includes(entity)) {
        this.entities.push(entity);

        this.systems.forEach((system) => {
          system.loadEntity(entity);
        });
      }
    });

    return this;
  }

  public unloadEntity(...entities: Entity[]): Instance {
    entities.forEach((entity) => {
      if (this.entities.includes(entity)) {
        this.entities.splice(this.entities.indexOf(entity), 1);

        this.systems.forEach((system) => {
          system.unloadEntity(entity);
        });
      }
    });

    return this;
  }

  public loadComponent(...components: Component[]): Instance {
    components.forEach((component) => {
      if (!this.components.includes(component)) {
        this.components.push(component);
      }
    });

    return this;
  }

  public unloadComponent(...components: Component[]): Instance {
    components.forEach((component) => {
      if (this.components.includes(component)) {
        this.components.splice(this.components.indexOf(component), 1);
      }
    });

    return this;
  }

  public bindComponent(entity: Entity, ...components: Component[]): Instance {
    components.forEach((component) => {
      if (!entity.components.some(entComp => component instanceof entComp.constructor)) {
        entity.components.push(component);
      }
    });

    this.systems.forEach((system) => {
      system.loadEntity(entity);
    });

    return this;
  }
}

export default Instance;
