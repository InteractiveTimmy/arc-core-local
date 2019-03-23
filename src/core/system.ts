import ArcObject from './arc-object';
import Componet from './component';
import Entity from './entity';

class System extends ArcObject {
  public readonly isSystem: boolean = true
  public entities: Entity[] = []
  public components: Componet[] = []

  public onBeforeUpdate: (dt: number) => void
  public onUpdate: (dt: number) => void
  public onAfterUpdate: (dt: number) => void

  public step(dt: number): void {
    this.beforeUpdate(dt);
    this.onUpdate(dt);
    this.afterUpdate(dt);
  }

  protected beforeUpdate(dt: number): void {
    this.onBeforeUpdate(dt);
  }

  protected update(dt: number): void {
    this.onUpdate(dt);
  }

  protected afterUpdate(dt: number): void {
    this.onAfterUpdate(dt);
  }
}

export default System;
