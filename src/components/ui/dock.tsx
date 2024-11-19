"use client";

import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import React, { useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export interface DockProps extends VariantProps<typeof dockVariants> {
  distance?: number;
  className?: string;
  magnification?: number;
  children: React.ReactNode;
  direction?: "top" | "middle" | "bottom";
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva("mx-auto mt-8 flex h-14 w-max gap-2 rounded-2xl border bg-background p-2");

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      children,
      className,
      direction = "bottom",
      distance = DEFAULT_DISTANCE,
      magnification = DEFAULT_MAGNIFICATION,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = useCallback(() => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX,
            distance,
            magnification,
          });
        }
        return child;
      });
    }, [children, mouseX, distance, magnification]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-end": direction === "bottom",
          "items-center": direction === "middle",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseX?: any;
  size?: number;
  distance?: number;
  className?: string;
  magnification?: number;
  props?: PropsWithChildren;
  children?: React.ReactNode;
}

function DockIcon({
  mouseX,
  children,
  className,
  distance = DEFAULT_DISTANCE,
  magnification = DEFAULT_MAGNIFICATION,
  ...props
}: Omit<DockIconProps, "size">): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);

  const width = useSpring(widthSync, {
    mass: 0.1,
    damping: 12,
    stiffness: 150,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn("flex aspect-square cursor-pointer items-center justify-center rounded-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
