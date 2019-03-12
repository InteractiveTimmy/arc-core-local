class Canvas2D {
  constructor() {
    this.elm = document.createElement('canvas');
    this.ctx = this.element.getContext('2d');
    this.accuracy = 32;
  }

  render(scene, view) {
    scene.children.forEach((child) => {
      // do some stuff to render the child object
      // be sure to check z-buffer
      // be sure to check if object is in view [cull]
    });

    return this;
  }
}

export default Canvas2D;
