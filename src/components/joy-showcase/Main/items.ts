import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import {
  faDesktop,
  faGamepad,
  faPowerOff,
  faQuestionCircle,
  faTelevision,
} from '@fortawesome/free-solid-svg-icons';

import { Item as MenuItem } from '../menu.tsx';

const icons: Record<string, IconProp> = {
  'fontawesome/steam': faSteam,
  'fontawesome/desktop': faDesktop,
  'fontawesome/gamepad': faGamepad,
  'fontawesome/television': faTelevision,
  'fontawesome/power-off': faPowerOff,
};

export interface ConfigItem {
  id: string;
  icon: string;
  title: string;
  actionType: 'url' | 'command' | 'internal';
  action: string;
  selected?: boolean;
}

const actionTypeNotFound = (type: string) => () => {
  console.error(`Action type not found: ${type}`);
};

export function parseItems(
  items: ConfigItem[]
): MenuItem[] {
  return items.map((item) => ({
    id: item.id ?? Math.random().toString(16),
    icon: icons[item.icon] ?? faQuestionCircle,
    title: item.title ?? 'No title',
    onSelect: actionTypeNotFound(item.actionType),
  }));
}
