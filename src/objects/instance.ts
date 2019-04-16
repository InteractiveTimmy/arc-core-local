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

    this.dt = 0;
    this.dts = 0;

    Object.defineProperties(this, {
      isInstance: { value: true, writable: false },
      systems: { value: [], writable: false },
    });
  }

  public update(scene: Scene): void {
    this.dt = (performance.now() - this.dts) / 1000;
    this.dts = performance.now();

    this.systems.forEach((system: System): void => {
      system.update(scene, this.dt);
    });
  }

  public load(...systems: System[]): Instance {
    systems.forEach((system: System): void => {
      if (system.isSystem && !this.systems.includes(system)) {
        if (system.parent) { system.detach(); }
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
}