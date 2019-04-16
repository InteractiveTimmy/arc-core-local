// dependencies
import { ArcObject } from './arc-object';
import { Component } from './component';
import { Scene } from './scene';
import { Instance } from './instance';

export class System extends ArcObject {
  public readonly isSystem: boolean;
  public parent: Instance;
  public components: (() => Component)[];

  public constructor() {
    super();

    Object.defineProperties(this, {
      isSystem: { value: true, writable: false },
      components: { value: [], writable: false },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  public update(scene: Scene, dt: number): void {}

  public attach(instance: Instance): System {
    if (this.parent) { this.parent.unload(this); }
    this.parent = instance;
    return this;
  }

  public detach(): System {
    if (this.parent) { this.parent.unload(this); }
    this.parent = null;
    return this;
  }
}
