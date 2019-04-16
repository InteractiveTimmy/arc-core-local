import { Component } from '../objects/component';

export class Camera extends Component {
  public fov: number;
  public aspect: number;
  public near: number;
  public far: number;

  public constructor(fov: number, aspect: number, near: number, far: number) {
    super();
  }
}
