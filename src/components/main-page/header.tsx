import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import personalAvatar from "@/assets/profile/personal/avatar-mini.jpg";
import {Badge} from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useLocalStorage } from "usehooks-ts";
import { Moon, Sun } from "lucide-react";

export function Header() {
  // document.documentElement.classList.toggle(
  //   "dark",
  //   localStorage.theme === "dark" ||
  //   (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  // );

  const [theme, setTheme] = useLocalStorage(
    "theme",
    () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    {
      serializer: t => t,
      deserializer: t => t,
    }
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return <div className="flex items-center my-4">
    <div className="flex items-center gap-4 flex-1">
      <Avatar className="size-16 text-2xl">
        <AvatarImage src={personalAvatar} alt="Profile icon"/>
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
      <div className="flex-1 font-semibold">
        <h1 className="text-2xl">Anna Silva</h1>
        <span className="space-x-2">
          <Badge variant="secondary" className="bg-pink-600 text-white">she / her</Badge>
          <Badge variant="secondary" className="bg-cyan-600 text-white">transgender</Badge>
          <Badge variant="secondary" className="bg-amber-600 text-white">autistic</Badge>
        </span>
      </div>
    </div>
    <div className="flex items-center">
      <Button onClick={toggleTheme}>
        {theme === 'dark' ?  <Sun/> : <Moon/>}<span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  </div>;
}