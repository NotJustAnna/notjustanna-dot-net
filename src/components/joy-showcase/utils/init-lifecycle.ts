export abstract class InitLifecycle {
  protected destroyers: (() => void)[] = [];

  constructor(public isInit: boolean = false) {}

  init() {
    if (this.isInit) {
      this.destroy();
    }

    this.onInit();

    this.isInit = true;
  }

   
  protected onInit(): void {}

   
  protected onDestroy(): void {}

  protected addDestroyer(...destroyer: (() => void)[]) {
    this.destroyers.push(...destroyer);
  }

  protected addLifecycle<T extends InitLifecycle>(lifecycle: T): T {
    this.addDestroyer(lifecycle.destroy.bind(lifecycle));
    return lifecycle;
  }

  protected addAndInitLifecycle<T extends InitLifecycle>(lifecycle: T): T {
    this.addLifecycle(lifecycle).init();
    return lifecycle;
  }

  protected addAndInitLifecycles(...lifecycles: InitLifecycle[]) {
    lifecycles.forEach((lifecycle) => this.addAndInitLifecycle(lifecycle));
  }

  destroy() {
    this.destroyers.forEach((it) => it());
    this.destroyers = [];
    this.onDestroy();
    this.isInit = false;
  }
}
