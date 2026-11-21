import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";


const tabVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-col gap-4",
        vertical: "flex-row gap-4",
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    },
  }
);

function Tabs({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & VariantProps<typeof tabVariants>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(tabVariants({ orientation, className}))}
      orientation={orientation}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  // Metro pivot: no box, just words. Scrolls sideways when they don't fit.
  const inlineClasses = `
  flex
  gap-x-5
  data-[orientation=horizontal]:overflow-x-auto
  data-[orientation=horizontal]:scrollbar-none
  data-[orientation=vertical]:flex-col
  data-[orientation=vertical]:gap-y-1
  data-[orientation=vertical]:shrink-0
  data-[orientation=vertical]:pe-6
  `;

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        inlineClasses,
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const inlineClasses = `
  text-2xl
  md:text-3xl
  font-bold
  tracking-[-0.025em]
  leading-tight
  text-left
  whitespace-nowrap
  lowercase
  text-foreground/25
  hover:text-foreground/60
  data-[state=active]:text-foreground
  transition-colors
  cursor-pointer
  disabled:pointer-events-none
  disabled:opacity-50
  `;

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        inlineClasses,
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
