import { InitLifecycle } from '@/components/joy-showcase/utils/init-lifecycle.ts';
import { GamepadDetail } from '@/components/joy-showcase/event/details/GamepadDetail.ts';
import { GamepadPolling } from './gamepad-polling.ts';

export class GamepadHandler extends InitLifecycle {
  private readonly polling: GamepadPolling;

  private lastConnectedCount = 0;

  constructor(private readonly target: EventTarget) {
    super();
    this.polling = new GamepadPolling(this.target);
  }

  protected onInit(): void {
    this.addLifecycle(this.polling);
    const listener = this.detect.bind(this);
    window.addEventListener('gamepadconnected', listener);
    window.addEventListener('gamepaddisconnected', listener);
    this.addDestroyer(() => {
      window.removeEventListener('gamepadconnected', listener);
      window.removeEventListener('gamepaddisconnected', listener);
    });
    this.detect();
  }

  private detect() {
    const connectedCount = navigator
      .getGamepads()
      .reduce((acc, it) => acc + (it != null ? 1 : 0), 0);

    if (connectedCount > 0 && !this.polling.isInit) {
      this.polling.init();
    } else if (connectedCount === 0 && this.polling.isInit) {
      this.polling.destroy();
    }

    if (this.lastConnectedCount !== connectedCount) {
      this.lastConnectedCount = connectedCount;
      this.target.dispatchEvent(
        new CustomEvent<GamepadDetail>('gamepad', {
          detail: {
            connectedCount,
          },
        }),
      );
    }
  }
}
