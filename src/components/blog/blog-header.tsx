import { HeaderBase } from "@/components/header-base";

export function BlogHeader({ pathname, section }: { pathname: string; section?: string }) {
  return <HeaderBase pathname={pathname} section={section} />;
}
