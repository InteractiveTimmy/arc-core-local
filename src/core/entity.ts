import ArcObject from './arc-object';
import Component from './component';

class Entity extends ArcObject {
  public readonly isEntity: boolean = true
  public components: Component[] = []
}

export default Entity;
