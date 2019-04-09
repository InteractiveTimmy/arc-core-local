// dependencies
import { ArcObject } from './arc-object';
import { Scene } from './scene';

export class Instance extends ArcObject {
  public readonly isInstance: boolean = true
  protected readonly pScenes: Scene[]

  // getters
  public get scenes(): Scene[] { return [...this.pScenes]; }

  // TODO: load()
  public load(...scenes: Scene[]): Instance {
    return this;
  }

  // TODO: unload()
  public unload(...scenes: Scene[]): Instance {
    return this;
  }
}
