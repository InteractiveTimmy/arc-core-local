import ArcObject from './arc-object';

class Component extends ArcObject {
  constructor() {
    super();

    Object.defineProperties(this, {
      isComponent: { value: true },
    });
  }
}

export default Component;
