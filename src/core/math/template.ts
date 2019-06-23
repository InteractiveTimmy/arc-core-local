// imports
import { clamp } from '../utils/math';

// notes
// TODO / REVIEW: ${x} methods

export class Template {
  // readonly
  public readonly isTemplate: boolean;

  // writable variables
  public x: number;
  public y: number;
  public z: number;

  // constructor
  public constructor(x: number, y: number, z: number) {
    // assign params first
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    // assign readonly
    Object.defineProperties(this, {
      isTemplate: { value: true, writable: false },
    });
  }
}
