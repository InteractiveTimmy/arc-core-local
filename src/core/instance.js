/* eslint-disable class-methods-use-this */

import ArcObject from './arc-object';

class Instance extends ArcObject {
  constructor() {
    super();

    Object.defineProperties(this, {
      isInstance: { value: true },
      components: { value: [] },
      entities: { value: [] },
      systems: { value: [] },
      stats: {
        value: {
          dt: 0,
          pts: 0,
        },
      },
    });
  }

  load(...items) {

  }

  unload(...items) {

  }

  attach(entity, ...components) {

  }

  detach(entity, ...components) {

  }

  start() {
    while (true) {
      this.stats.dt = performance.now() - this.stats.pts;
      this.stats.pts = performance.now();
    }
  }

  stop() {

  }

  step() {
    console.log(this.stats.dt);
    setTimeout(() => { this.step(); }, 1000);
  }
}

export default Instance;
