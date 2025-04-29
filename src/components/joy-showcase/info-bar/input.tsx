import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGamepad,
  faKeyboard,
  faMouse,
} from '@fortawesome/free-solid-svg-icons';
import { useEvents } from '@/components/joy-showcase/event/context.ts';
import { useEvent } from '@/components/joy-showcase/utils/useEvent.ts';
import { isInputEvent } from '@/components/joy-showcase/event/details/InputDetail.ts';
import { isGamepadEvent } from '@/components/joy-showcase/event/details/GamepadDetail.ts';
import { isMouseVisibleEvent } from '@/components/joy-showcase/event/details/MouseVisibleDetail.ts';

export default function Input() {
  const events = useEvents();
  const [inputType, setInputType] = useState<'keyboard' | 'gamepad' | 'mouse' | 'none'>('none');
  const [gamepadCount, setGamepadCount] = useState(0);

  useEvent(events, 'input', (event) => {
    if (!isInputEvent(event)) return;
    setInputType(event.detail.source.type);
  });

  useEvent(events, 'gamepad', (event) => {
    if (!isGamepadEvent(event)) return;
    const { connectedCount } = event.detail;
    setGamepadCount(connectedCount);
    if (connectedCount === 0) {
      setInputType('none');
    }
  });

  useEvent(events, 'mouse-visible', (event) => {
    if (!isMouseVisibleEvent(event)) return;
    const { visible } = event.detail;
    if (visible) {
      setInputType('mouse');
    } else if (inputType === 'mouse') {
      setInputType('none');
    }
  });

  if (inputType === 'keyboard') {
    return <FontAwesomeIcon icon={faKeyboard} className="text-3xl" />;
  }

  if (inputType === 'mouse') {
    return <FontAwesomeIcon icon={faMouse} className="text-3xl" />;
  }

  if (inputType === 'gamepad') {
    return new Array(gamepadCount).fill(null).map((_, i) => (
      <FontAwesomeIcon
        key={`input-${i}`}
        icon={faGamepad}
        className="text-3xl"
      />
    ));
  }

  return false;
}
