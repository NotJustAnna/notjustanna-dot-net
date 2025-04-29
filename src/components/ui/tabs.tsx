import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import {cva, VariantProps} from "class-variance-authority";


const tabVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-col gap-2",
        vertical: "flex-row gap-2",
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
  const inlineClasses = `
  bg-muted
  text-muted-foreground
  inline-flex
  data-[orientation=vertical]:flex
  data-[orientation=vertical]:flex-col
  data-[orientation=horizontal]:h-9
  data-[orientation=vertical]:flex-shrink-1
  w-fit
  items-center
  justify-center
  rounded-lg
  p-[3px]
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
  data-[state=active]:bg-background
  dark:data-[state=active]:text-foreground
  focus-visible:border-ring
  focus-visible:ring-ring/50
  focus-visible:outline-ring
  dark:data-[state=active]:border-input
  dark:data-[state=active]:bg-input/30
  text-foreground
  dark:text-muted-foreground
  inline-flex
  data-[orientation=horizontal]:h-[calc(100%-1px)]
  data-[orientation=horizontal]:flex-1
  items-center
  justify-center
  gap-1.5
  rounded-md
  border
  border-transparent
  px-2
  py-1
  text-sm
  font-medium
  whitespace-nowrap
  transition-[color,box-shadow]
  focus-visible:ring-[3px]
  focus-visible:outline-1
  disabled:pointer-events-none
  disabled:opacity-50
  data-[state=active]:shadow-sm
  [&_svg]:pointer-events-none
  [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-4
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
  /*
    className={cn(
      "ml-4 mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
   */
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
