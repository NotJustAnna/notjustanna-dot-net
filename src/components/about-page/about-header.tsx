import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeaderBase } from "@/components/header-base";

export function AboutHeader() {
  return (
    <HeaderBase
      actions={
        <Button className="hidden md:flex" variant="outline" asChild>
          <a href="/">Blog →</a>
        </Button>
      }
    >
      <div className="space-x-1.5 sm:space-x-2">
        <Badge variant="secondary" className="bg-pink-600 text-white">she / her</Badge>
        <Badge variant="secondary" className="bg-cyan-600 text-white">transgender</Badge>
        <Badge variant="secondary" className="bg-amber-600 text-white">autistic</Badge>
      </div>
    </HeaderBase>
  );
}
