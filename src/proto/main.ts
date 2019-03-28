import Sub, { reference as subReference, getByUUID as subGetByUUID, Reference } from './sub';

class Main {
  public count: number
  public readonly subReference: Reference<Sub>
  public readonly subGetByUUID: (number: string) => Sub

  public constructor(count: number) {
    this.subReference = subReference;
    this.subGetByUUID = subGetByUUID;
    this.count = count;
  }
}

export default Main;
