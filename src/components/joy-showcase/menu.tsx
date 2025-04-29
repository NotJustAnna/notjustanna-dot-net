import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import { useEvents } from '@/components/joy-showcase/event/context.ts';
import { useEvent } from '@/components/joy-showcase/utils/useEvent.ts';
import { isInputEvent } from '@/components/joy-showcase/event/details/InputDetail.ts';
import MenuGrid from './menu-grid.tsx';
import MenuGridItem from './menu-grid-item.tsx';
import ItemContents from './item-contents.tsx';
import { clamp } from './shooting-star-scene/math.ts';

export interface Item {
  id: string;
  icon: IconProp;
  title: string;
  onSelect: () => void;
}

export interface MenuProps {
  items: Item[];
  initialSelected?: number;
}

export default function Menu({ items, initialSelected }: MenuProps) {
  if (initialSelected === undefined)
    initialSelected = Math.floor(items.length / 2);
  const events = useEvents();
  const [selected, setSelected] = useState<number>(
    clamp(initialSelected, 0, items.length - 1),
  );

  useEvent(events, 'input', (event) => {
    if (!isInputEvent(event)) return;
    const { code } = event.detail;

    if (code === 'enter') {
      const selectedItem = items[selected];
      if (!selectedItem) return;
      selectedItem.onSelect();
    }

    const offset = code === 'left' ? -1 : code === 'right' ? 1 : 0;
    if (offset === 0) return;
    setSelected((prev) => {
      const next = prev + offset;
      return next < 0 ? items.length - 1 : next >= items.length ? 0 : next;
    });
  });

  return (
    <MenuGrid>
      {items.map((item, index) => (
        <MenuGridItem
          key={item.id}
          active={selected === index}
          onClick={() => item.onSelect()}
          onEnter={() => setSelected(index)}
        >
          <ItemContents icon={item.icon} title={item.title} />
        </MenuGridItem>
      ))}
    </MenuGrid>
  );
}
