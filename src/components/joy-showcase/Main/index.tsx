import Menu, { Item } from '../menu.tsx';
import { parseItems } from './items.ts';

export default function Main() {
  // const config = useConfig();
  // const navigate = useNavigate();

  const items: Item[] = parseItems([
    {
      id: "steam",
      actionType: "url",
      icon: "fontawesome/steam",
      action: "https://store.steampowered.com/",
      title: "Steam",
    },
    {
      id: "retroarch",
      actionType: "url",
      icon: "fontawesome/gamepad",
      action: "https://www.retroarch.com/",
      title: "RetroArch",
    },
    {
      id: "desktop",
      actionType: "url",
      icon: "fontawesome/desktop",
      action: "https://www.microsoft.com/en-us/windows",
      title: "Desktop",
    },
    {
      id: "tv",
      actionType: "url",
      icon: "fontawesome/television",
      action: "https://www.samsung.com/us/support/tv-audio-video/",
      title: "Kodi",
    },
    {
      id: "power",
      actionType: "command",
      icon: "fontawesome/power-off",
      action: "shutdown -h now",
      title: "Power",
    }
  ]);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="font-bold text-4xl">No items!</h1>
        <p className="text-lg">
          Add some items to the config file to get started.
        </p>
      </div>
    );
  }

  return <Menu items={items} />;
}
