// dependencies
import { ArcObject } from './arc-object';
import { System } from './system';
import { Scene } from './scene';

export class Instance extends ArcObject {
  public readonly isInstance: boolean;
  public readonly systems: System[];
  public dt: number;
  public dts: number;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isInstance: { writable: false, value: true },
      systems: { writable: false, value: [] },
    });

    this.dt = 0;
    this.dts = 0;
  }

  public load(...systems: System[]): Instance {
    systems.forEach((system: System): void => {
      if (system.isSystem && !this.systems.includes(system)) {
        if (system.parent) { system.parent.unload(system); system.detach(); }
        this.systems.push(system);
        system.attach(this);
      }
    });

    return this;
  }

  public unload(...systems: System[]): Instance {
    systems.forEach((system: System): void => {
      if (system.isSystem && this.systems.includes(system)) {
        if (system.parent === this) { system.detach(); }
        this.systems.splice(this.systems.indexOf(system), 1);
      }
    });

    return this;
  }

  public update(scene: Scene): void {
    this.dt = (performance.now() - this.dts) / 1000;
    this.dts = performance.now();

    this.systems.forEach((system: System): void => {
      system.update(scene, this.dt);
    });
  }
}
