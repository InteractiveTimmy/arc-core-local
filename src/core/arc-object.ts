import { uuid } from '../utils/index';

let aoid = 0;

class ArcObject {
  public readonly id: number = aoid += 1
  public readonly uuid: string = uuid()
  public readonly isArcObject: boolean = true
}

export default ArcObject;
