import { ScrollArea } from "@/components/ui/scroll-area";
import React, { PropsWithChildren } from "react";

const MaxWidthWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ScrollArea className="h-screen">
      <div className="container block space-y-6 py-10  pb-16 lg:p-10">
        {children}
      </div>
    </ScrollArea>
  );
};

export default MaxWidthWrapper;
