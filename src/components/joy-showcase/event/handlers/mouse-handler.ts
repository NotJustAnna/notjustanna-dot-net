import { InitLifecycle } from "@/components/joy-showcase/utils/init-lifecycle.ts";
import { MouseVisibleDetail } from "@/components/joy-showcase/event/details/MouseVisibleDetail.ts";

export class MouseHandler extends InitLifecycle {
  private mouseTimer: number | string | null = null;

  private mouseVisible: boolean = true;

  constructor(private readonly target: EventTarget) {
    super();
  }

  protected onInit(): void {
    const handleMouseMove = this.handleMouseMove.bind(this);
    document.addEventListener('mousemove', handleMouseMove);
    this.addDestroyer(() =>
      document.removeEventListener('mousemove', handleMouseMove),
    );
  }

  private handleMouseMove(): void {
    if (this.mouseTimer) {
      window.clearTimeout(this.mouseTimer);
    }

    if (!this.mouseVisible) {
      document.body.style.cursor = 'default';
      this.mouseVisible = true;

      this.emit(true);
    }

    this.mouseTimer = window.setTimeout(() => {
      document.body.style.cursor = 'none';
      this.mouseVisible = false;

      this.emit(false);
    }, 3000);
  }

  private emit(visible: boolean): void {
    this.target.dispatchEvent(
      new CustomEvent<MouseVisibleDetail>('mouse-visible', {
        detail: { visible },
      }),
    );
  }
}