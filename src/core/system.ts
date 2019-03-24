import ArcObject from './arc-object';
import Component from './component';
import Entity from './entity';

class System extends ArcObject {
  public readonly isSystem: boolean = true
  public entities: Entity[] = []
  public components: (() => Component)[] = []

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

  public loadEntity(...entities: Entity[]): System {
    entities.forEach((entity) => {
      if (this.canLoad(entity) && !this.entities.includes(entity)) {
        this.entities.push(entity);
      }
    });

    return this;
  }

  public unloadEntity(...entities: Entity[]): System {
    entities.forEach((entity) => {
      if (this.entities.includes(entity)) {
        this.entities.splice(this.entities.indexOf(entity), 1);
      }
    });

    return this;
  }

  public canLoad(entity: Entity): boolean {
    return this.components.every(compSelf => entity.components.some(compEnt => compEnt instanceof compSelf));
  }
}

export default System;
