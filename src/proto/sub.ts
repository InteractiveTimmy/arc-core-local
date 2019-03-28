import { uuid } from '../utils/index';

export interface Reference<T> {
  [index: string]: T;
}

let aoid = 0;
const reference: Reference<Sub> = {};

function getByUUID(myUUID: string): Sub {
  return reference[myUUID];
}

class Sub {
  public readonly id: number = aoid += 1
  public readonly uuid: string = uuid()
  public value: number

  public constructor(value: number) {
    reference[this.uuid] = this;

    this.value = value;
  }

  public dispose(): void {
    delete reference[this.uuid];
  }
}

export { reference, getByUUID };
export default Sub;
