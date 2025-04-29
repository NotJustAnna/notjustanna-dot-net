import { InitLifecycle } from '@/components/joy-showcase/utils/init-lifecycle.ts';
import { InputCode, InputDetail } from '@/components/joy-showcase/event/details/InputDetail.ts';
import { GamepadAxisCode } from '@/components/joy-showcase/event/utils/GamepadAxisCode.ts';
import { GamepadButtonCode } from '@/components/joy-showcase/event/utils/GamepadButtonCode.ts';
import { Repeater } from '@/components/joy-showcase/event/utils/Repeater.ts';

export class GamepadPolling extends InitLifecycle {
  private readonly repeater = new Repeater(400, 100, this.emit.bind(this));

  private readonly timestamps = new Map<number, number>();

  constructor(private readonly target: EventTarget) {
    super();
  }

  protected onInit(): void {
    const loop = () => {
      if (!this.isInit) return;
      this.poll();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  private poll() {
    if (!document.hasFocus()) return;

    navigator.getGamepads().forEach((gamepad, index) => {
      if (!gamepad || !gamepad.connected) return;

      if (!this.timestamps.has(index)) {
        this.timestamps.set(index, gamepad.timestamp);
      } else if (this.timestamps.get(index) === gamepad.timestamp) {
        return;
      } else {
        this.timestamps.set(index, gamepad.timestamp);
      }

      gamepad.buttons.forEach((button, buttonIndex) => {
        if (!(buttonIndex in GamepadPolling.BUTTON_MAP)) return;

        const code = `${index}#${GamepadPolling.BUTTON_MAP[buttonIndex]}`;
        if (button.pressed) {
          this.repeater.down(code);
        } else {
          this.repeater.up(code);
        }
      });

      for (const [x, y] of GamepadPolling.AXIS) {
        const [xValue, yValue] = [gamepad.axes[x], gamepad.axes[y]];

        if (xValue === undefined || yValue === undefined) continue;

        if (Math.abs(xValue) > 0.5) {
          this.repeater.down(`${index}#${xValue > 0 ? 'right' : 'left'}#axis`);
        } else {
          this.repeater.up(`${index}#right#axis`);
          this.repeater.up(`${index}#left#axis`);
        }

        if (Math.abs(yValue) > 0.5) {
          this.repeater.down(`${index}#${yValue > 0 ? 'down' : 'up'}#axis`);
        } else {
          this.repeater.up(`${index}#down#axis`);
          this.repeater.up(`${index}#up#axis`);
        }
      }
    });
  }

  private emit(rawKey: string) {
    if (!this.isInit) return;

    const [index, key] = rawKey.split('#');
    if (!index || !key) return;

    this.target.dispatchEvent(
      new CustomEvent<InputDetail>('input', {
        detail: {
          code: key as InputCode,
          source: {
            type: 'gamepad',
            index: parseInt(index, 10),
          },
        },
      }),
    );
  }

  private static BUTTON_MAP: Record<number, InputCode> = {
    [GamepadButtonCode.DPadUp]: 'up',
    [GamepadButtonCode.DPadDown]: 'down',
    [GamepadButtonCode.DPadLeft]: 'left',
    [GamepadButtonCode.DPadRight]: 'right',
    [GamepadButtonCode.Button1]: 'enter',
    [GamepadButtonCode.Button2]: 'back',
    [GamepadButtonCode.Start]: 'menu',
  };

  private static AXIS: [GamepadAxisCode, GamepadAxisCode][] = [
    [GamepadAxisCode.LeftStickHorizontal, GamepadAxisCode.LeftStickVertical],
  ];
}
