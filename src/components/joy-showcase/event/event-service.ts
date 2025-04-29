import { InitLifecycle } from '@/components/joy-showcase/utils/init-lifecycle.ts';
import { GamepadHandler } from '@/components/joy-showcase/event/handlers/gamepad-handler.ts';
import { KeyboardHandler } from '@/components/joy-showcase/event/handlers/keyboard-handler.ts';

import { MouseHandler } from "@/components/joy-showcase/event/handlers/mouse-handler.ts";

export class EventService extends InitLifecycle {
  public readonly target = new EventTarget();

  protected onInit(): void {
    this.addAndInitLifecycles(
      new KeyboardHandler(this.target),
      new GamepadHandler(this.target),
      new MouseHandler(this.target)
    );
  }
}
