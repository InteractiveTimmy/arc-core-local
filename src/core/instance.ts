/* eslint-disable class-methods-use-this */

import ArcObject from './arc-object';
import Component from './component';
import Entity from './entity';
import System from './system';

class Instance extends ArcObject {
  public readonly isInstance: boolean = true
  public components: Component[] = []
  public entities: Entity[] = []
  public systems: System[] = []
  private deltaTime: number = 0
  private prevTime: number = 0;
  private active: boolean = false;

  protected step(): void {
    if (!this.active) { return null; }

    this.deltaTime = Date.now() - this.prevTime;
    this.prevTime = Date.now();

    // eslint-disable-next-line no-console
    console.log(this.deltaTime);

    this.systems.forEach((system: System) => {
      system.step(this.deltaTime);
    });

    setTimeout(() => { this.step(); }, 0);
    return null;
  }

  public start(): void {
    if (!this.active) {
      this.active = true;
      this.step();
    }
  }

  public stop(): void {
    if (this.active) { this.active = false; }
  }
}

export default Instance;
