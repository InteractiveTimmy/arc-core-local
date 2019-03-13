import ArcObject from './arc-object';

class Entity extends ArcObject {
  constructor() {
    super();

    Object.defineProperties(this, {
      isEntity: { value: true },
      components: { value: [] },
    });
  }
}

export default Entity;
