import { uuid } from '../utils/uuid';

export class ArcObject {
  public readonly isArcObject: boolean;
  public readonly uuid: string;

  public constructor() {
    Object.defineProperties(this, {
      isArcObject: { writable: false, value: true },
      uuid: { writable: false, value: uuid() },
    });
  }
}
