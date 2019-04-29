import { Entity } from '../../objects/entity';
import { System } from '../../objects/system';
import { Scene } from '../../objects/scene';

import { Transform } from '../../components/transform';
import { Camera } from '../../components/camera';

export class DepthSorter extends System {
  public constructor() {
    super();

    this.components.push(Transform, Camera);
  }

  public update(scene: Scene): void {
    const [camera] = scene.getEntities(...this.components);
    const ct = camera.components.transform as Transform;

    scene.entities.sort((a: Entity, b: Entity): number => {
      if (!a.components.transform) { return 1; }
      if (!b.components.transform) { return -1; }

      const at = a.components.transform as Transform;
      const bt = b.components.transform as Transform;
      if (ct.position.distanceTo(at.position) > ct.position.distanceTo(bt.position)) {
        return -1;
      }
      if (ct.position.distanceTo(at.position) < ct.position.distanceTo(bt.position)) {
        return 1;
      }

      return 0;
    });
  }
}
