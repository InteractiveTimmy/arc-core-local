import { ArcObject } from './arc-object';
import { Scene } from './scene';
import { Instance } from './instance';

export class System extends ArcObject {
  public readonly isSystem: boolean;
  protected pParent: Instance;

  public update: (s: Scene, dt: number) => void;

  public constructor() {
    super();

    Object.defineProperties(this, {
      isSystem: { value: true, writable: false },
    });
  }

  public get parent(): Instance { return this.pParent; }

  public attach(instance: Instance): System {
    if (instance.isInstance && !this.pParent) { this.pParent = instance; }
    return this;
  }

  public detach(): System {
    if (this.pParent) { this.pParent = null; }
    return this;
  }
}
