import { uuid } from '../utils/index';

let aoid = 0;

class ArcObject {
  constructor() {
    Object.defineProperties(this, {
      id: { value: aoid += 1 },
      uuid: { value: uuid() },
      isArcObject: { value: true },
    });
  }
}

export default ArcObject;
