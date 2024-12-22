import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useId, useRef, useState, useEffect, useCallback } from "react";

interface AnimatedGridPatternProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  duration?: number;
  className?: string;
  numSquares?: number;
  maxOpacity?: number;
  repeatDelay?: number;
  strokeDasharray?: number;
}

export function AnimatedGridPattern({
  x = -1,
  y = -1,
  className,
  width = 40,
  height = 40,
  duration = 4,
  numSquares = 50,
  maxOpacity = 0.5,
  strokeDasharray = 0,
  ...props
}: AnimatedGridPatternProps): React.JSX.Element {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getPos = useCallback((): [number, number] => {
    return [
      // eslint-disable-next-line sonarjs/pseudo-random
      Math.floor((Math.random() * dimensions.width) / width),
      // eslint-disable-next-line sonarjs/pseudo-random
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }, [dimensions, width, height]);
  // Adjust the generateSquares function to return objects with an id, x, and y
  const generateSquares = useCallback(
    (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
      }));
    },
    [getPos],
  );
  const id = useId();
  const containerRef = useRef(null);
  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  const updateSquarePosition = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (id: number) => {
      setSquares((currentSquares) =>
        currentSquares.map((sq) =>
          sq.id === id
            ? {
                ...sq,
                pos: getPos(),
              }
            : sq,
        ),
      );
    },
    [setSquares, getPos],
  );
  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) setSquares(generateSquares(numSquares));
  }, [dimensions, generateSquares, numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    const container = containerRef.current;
    if (container) resizeObserver.observe(container);

    return () => {
      if (container) resizeObserver.unobserve(container);
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full fill-gray-400/30 stroke-gray-400/30", className)}
      {...props}
    >
      <defs>
        <pattern x={x} y={y} id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path fill="none" d={`M.5 ${height}V.5H${width}`} strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {squares.map(({ id, pos: [x, y] }, index) => (
          <motion.rect
            strokeWidth="0"
            width={width - 1}
            x={x * width + 1}
            y={y * height + 1}
            height={height - 1}
            fill="currentColor"
            initial={{ opacity: 0 }}
            key={`${x}-${y}-${index}`}
            animate={{ opacity: maxOpacity }}
            onAnimationComplete={() => updateSquarePosition(id)}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>
    </svg>
  );
}
