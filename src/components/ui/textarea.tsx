import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border-[1.5px] border-input bg-transparent  px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary transition-colors focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 xl:border-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
