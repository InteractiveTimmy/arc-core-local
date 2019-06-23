import { uuid } from '../utils/uuid';

export class ArcObject {
  public readonly isArcObject: boolean;
  public readonly uuid: string;

  public constructor() {
    Object.defineProperties(this, {
      isArcObject: { value: true, writable: false },
      uuid: { value: uuid(), writable: false },
    });
  }
}
