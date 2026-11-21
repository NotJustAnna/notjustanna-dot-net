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
  // Square buttons in a row (scrolls sideways when tight) or a column beside the panel.
  const inlineClasses = `
  flex
  gap-1.5
  data-[orientation=horizontal]:overflow-x-auto
  data-[orientation=horizontal]:scrollbar-none
  data-[orientation=vertical]:flex-col
  data-[orientation=vertical]:shrink-0
  data-[orientation=vertical]:w-40
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
  // Same language as the carousel's < > buttons: card-coloured squares, solid when active.
  const inlineClasses = `
  press
  h-10
  px-4
  text-base
  font-semibold
  text-left
  whitespace-nowrap
  bg-card
  text-foreground
  hover:bg-accent
  data-[state=active]:bg-foreground
  data-[state=active]:text-background
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
