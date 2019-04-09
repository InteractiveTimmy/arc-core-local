// dependencies
import { ArcObject } from './arc-object';
import { Instance } from './instance';
import { Entity } from './entity';
import { Component } from './component';

// reused interface
interface EntList { [index: string]: Entity[] }

export class Scene extends ArcObject {
  public readonly isScene: boolean = true
  protected pParent: Instance
  protected pEntArr: Entity[] = []
  protected pEntRef: EntList
  protected pModRef: EntList

  // getters
  public get parent(): Instance { return this.pParent; }
  public get entityList(): Entity[] { return [...this.pEntArr]; }
  public get entities(): EntList { return { ...this.pEntRef }; }
  public get entityGroups(): EntList { return { ...this.pModRef }; }

  public attach(parent: Instance): Scene {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = parent;
    return this;
  }

  public detach(): Scene {
    if (this.pParent) { this.pParent.unload(this); }
    this.pParent = null;
    return this;
  }

  public addEntRef(entity: Entity, component: Component): Scene {
    if (!this.pEntRef[component.type].includes(entity)) {
      this.pEntRef[component.type].push(entity);
    }
    return this;
  }

  public subEntRef(entity: Entity, component: Component): Scene {
    if (this.pEntRef[component.type].includes(entity)) {
      this.pEntRef[component.type].splice(this.pEntRef[component.type].indexOf(entity), 1);
    }
    return this;
  }

  public load(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && !this.pEntArr.includes(entity)) {
        this.pEntArr.push(entity);

        entity.componentList.forEach((component: Component): void => {
          this.addEntRef(entity, component);
        });

        entity.attach(this);
      }
    });

    return this;
  }

  public unload(...entities: Entity[]): Scene {
    entities.forEach((entity: Entity): void => {
      if (entity.isEntity && this.pEntArr.includes(entity)) {
        this.pEntArr.splice((this.pEntArr.indexOf(entity), 1));

        entity.componentList.forEach((component: Component): void => {
          this.subEntRef(entity, component);
        });

        entity.detach();
      }
    });

    return this;
  }
}
