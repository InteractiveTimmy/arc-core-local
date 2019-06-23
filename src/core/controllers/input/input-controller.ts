class InputController {
  public readonly canvas: HTMLCanvasElement;

  protected pActive: boolean;
  protected pLocking: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.pActive = false;
    this.pLocking = false;
  }

  protected pEnableDevices(...ids: number[]): InputController {
    ids.forEach((id: number): void => {
      switch (id) {
        case 0:
          break;
      }
    });
    return this;
  }

  protected pToggleLock(): InputController {
    if (document.pointerLockElement === this.canvas) {
      this.pActive = true;
    } else {
      this.pActive = false;
    }

    return this;
  }

  public toggleLocking(): InputController {
    // toggle flag
    this.pLocking = !this.pLocking;

    if (this.pLocking) {
      this.canvas.onclick = (): void => { this.canvas.requestPointerLock(); };
      document.addEventListener('pointerlockchange', this.pToggleLock.bind(this));
    } else {
      document.removeEventListener('pointerlockchange', this.pToggleLock.bind(this));
      this.canvas.onclick = (): void => { };
    }

    return this;
  }
}

export { InputController };
