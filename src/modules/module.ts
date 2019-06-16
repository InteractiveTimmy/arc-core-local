import { uuid } from '../utils/index';

class Module {
  public readonly uuid: string;

  public constructor() {
    this.uuid = uuid();
  }
}

export { Module };
