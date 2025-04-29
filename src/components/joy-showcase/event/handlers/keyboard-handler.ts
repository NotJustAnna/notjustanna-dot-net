import { InitLifecycle } from '@/components/joy-showcase/utils/init-lifecycle.ts';
import { InputCode, InputDetail } from '@/components/joy-showcase/event/details/InputDetail.ts';
import { Repeater } from '@/components/joy-showcase/event/utils/Repeater.ts';

export class KeyboardHandler extends InitLifecycle {
  private readonly repeater = new Repeater(400, 100, this.emit.bind(this));

  constructor(private readonly target: EventTarget) {
    super();
  }

  private emit(key: string) {
    if (!this.isInit) return;

    this.target.dispatchEvent(
      new CustomEvent<InputDetail>('input', {
        detail: {
          code: key as InputCode,
          source: {
            type: 'keyboard',
          },
        },
      }),
    );
  }

  protected onInit(): void {
    const down = this.handleDown.bind(this);
    const up = this.handleUp.bind(this);

    document.addEventListener('keydown', down);
    this.addDestroyer(() => document.removeEventListener('keydown', down));

    document.addEventListener('keyup', up);
    this.addDestroyer(() => document.removeEventListener('keyup', up));
  }

  private handleDown(event: KeyboardEvent) {
    const code = KeyboardHandler.CODE_MAP[event.code];
    if (code) {
      event.preventDefault();
      this.repeater.down(code);
    }
  }

  private handleUp(event: KeyboardEvent) {
    const code = KeyboardHandler.CODE_MAP[event.code];
    if (code) {
      event.preventDefault();
      this.repeater.up(code);
    }
  }

  private static CODE_MAP: Record<string, InputCode> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    Escape: 'back',
    Enter: 'enter',
  };
}
