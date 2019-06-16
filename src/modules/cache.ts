interface Data {
  uuid: string;
  name: string;
  buffer: ArrayBuffer;
  type: string;
}

class Cache {
  private readonly pBuffers: Data[];
  public constructor() {
    this.pBuffers = [];
  }
}

export { Cache };
