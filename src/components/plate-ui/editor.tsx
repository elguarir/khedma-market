import React from "react";
import { cn } from "@udecode/cn";
import { PlateContent } from "@udecode/plate-common";
import { cva } from "class-variance-authority";

import type { PlateContentProps } from "@udecode/plate-common";
import type { VariantProps } from "class-variance-authority";

const editorVariants = cva(
  cn(
    "relative border-[1.5px] xl:border-2 whitespace-pre-wrap break-words",
    "min-h-[80px] w-full rounded-md bg-background p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold",
  ),
  {
    variants: {
      variant: {
        outline: "border border-input",
        ghost: "",
      },
      focused: {
        true: "border-primary",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focusRing: {
        true: "focus-visible:border-primary",
        false: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      focusRing: true,
      size: "sm",
    },
  },
);

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants>;

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      disabled,
      focused,
      focusRing,
      readOnly,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className="relative w-full">
        <PlateContent
          className={cn(
            editorVariants({
              disabled,
              focused,
              focusRing,
              size,
              variant,
            }),
            className,
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);
Editor.displayName = "Editor";

export { Editor };
