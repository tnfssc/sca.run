import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/hooks/theme";
import { Dock, DockIcon } from "@/components/ui/dock";
import { buttonVariants } from "@/components/ui/button";
import { SunIcon, HomeIcon, UserIcon, MoonIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const navigationItems = [
  {
    href: "/",
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "About",
    icon: UserIcon,
    href: "//sharath.uk",
  },
] as const;

export function Navigation(): React.JSX.Element {
  const theme = useTheme();

  return (
    <div className="pointer-events-none absolute bottom-4 z-10 mx-auto w-full">
      <TooltipProvider>
        <Dock distance={60} direction="middle" className="pointer-events-auto">
          {navigationItems.map((item) => (
            <DockIcon key={item.href} className="cursor-default p-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    aria-label={item.name}
                    className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "rounded-full p-1.5")}
                  >
                    <item.icon className="size-full" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <DockIcon className="cursor-default p-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Toggle theme"
                  onMouseDown={() => theme.toggle()}
                  className={cn(
                    buttonVariants({ size: "icon", variant: "ghost" }),
                    "rounded-full p-1.5 focus-visible:ring-0",
                  )}
                >
                  {theme.value === "dark" ? <MoonIcon className="size-full" /> : <SunIcon className="size-full" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
