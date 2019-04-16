// dependencies
import { Mat4 } from '../math/mat-4';
import { Vec3 } from '../math/vec-3';
import { Euler } from '../math/euler';
import { Quat } from '../math/quat';

import { Component } from '../objects/component';

export class Transform extends Component {
  public readonly matrix: Mat4;
  public readonly quaternion: Quat;
  public readonly position: Vec3;
  public readonly rotation: Euler;

  public constructor() {
    super();

    this.matrix = new Mat4();
    this.quaternion = new Quat();
    this.position = new Vec3();
    this.rotation = new Euler();

    Object.seal(this);
  }
}
