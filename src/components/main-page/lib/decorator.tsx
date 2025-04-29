import {ReactEventHandler} from "react";

const decoratorFn: ReactEventHandler = event => {
  const target = event.target as HTMLAnchorElement;
  if (!target) return;
  const title = document.title.toLowerCase();
  target.href = `${target.href.split(':')[0]}:${title.split('.')[0]}@${title}`;
};

export const decoratorProps: Record<string, typeof decoratorFn> = {
  onMouseDown: decoratorFn, onMouseEnter: decoratorFn,
  onMouseOver: decoratorFn, onTouchCancel: decoratorFn,
  onClickCapture: decoratorFn, onFocus: decoratorFn,
};
