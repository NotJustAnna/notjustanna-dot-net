import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import personalAvatar from "@/assets/profile/personal/avatar-mini.jpg?url";

export function HeaderBase({ children, actions }: { children?: React.ReactNode; actions?: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <div className="flex items-center my-4 gap-4">
      <a href="/">
        <Avatar className="size-16 text-2xl">
          <AvatarImage src={personalAvatar} alt="Profile icon" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </a>
      <div className="flex-1 font-semibold">
        <a href="/" className="text-2xl hover:opacity-80 transition-opacity">Anna Silva</a>
        {children}
      </div>
      {actions}
      <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
