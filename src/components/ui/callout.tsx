"use client";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { useState } from "react";
import { Button } from "./button";
const callOutVariants = cva(
  `flex w-full items-center text-sm font-[450] gap-3 rounded-md px-4 py-3 transition-colors shadow-sm`,
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:[&_button]:text-secondary-foreground hover:[&_button]:bg-neutral-700/10 hover:[&_button]:dark:bg-neutral-600/20",
        info: "bg-sky-700/10 text-sky-700 dark:bg-sky-700/20 dark:text-sky-500/80 hover:[&_button]:text-sky-600 hover:[&_button]:bg-sky-700/10",
        success:
          "bg-green-700/10 text-green-700 dark:bg-green-700/20 dark:text-green-500/80 hover:[&_button]:text-green-700/80 hover:[&_button]:bg-green-700/10",
        warning:
          "bg-yellow-700/10 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-500/80 hover:[&_button]:text-yellow-600 hover:[&_button]:bg-yellow-700/10",
        danger:
          "bg-red-700/10 text-red-700 dark:bg-red-700/20 dark:text-red-500/80 hover:[&_button]:text-red-500 hover:[&_button]:bg-red-700/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CallOutProps extends VariantProps<typeof callOutVariants> {
  className?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
}

const Callout = ({
  variant,
  className,
  showCloseButton,
  children,
}: CallOutProps) => {
  let [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={cn(callOutVariants({ variant }), className)}>
      {children}
      {showCloseButton && (
        <Button
          onClick={() => setVisible(false)}
          variant={"ghost"}
          size={"icon"}
          type="button"
          className="ml-auto h-7 w-7 p-1.5"
        >
          <svg
            {...(visible
              ? { "aria-hidden": "false" }
              : { "aria-hidden": "true" })}
            className="h-3.5 w-3.5"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Callout;
