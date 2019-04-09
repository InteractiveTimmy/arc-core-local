// dependencies
import { uuid } from '../utils/uuid';

export class ArcObject {
  public readonly uuid: string = uuid()
  public readonly isArcObject: boolean = true
}
