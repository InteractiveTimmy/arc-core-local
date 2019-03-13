/* eslint-disable class-methods-use-this */

import ArcObject from './arc-object';

class System extends ArcObject {
  constructor() {
    super();

    Object.defineProperties(this, {
      isSystem: { value: true },
      components: { value: [] },
      entities: { value: [] },
    });
  }

  step(dt) {
    this.beforeUpdate(dt);
    this.onUpdate(dt);
    this.afterUpdate(dt);
  }

  beforeUpdate() {}

  onUpdate() {}

  afterUpdate() {}
}

export default System;
