"use client";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";

type Props = {
  email: string;
};

const CopyEmail = (props: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <p className="text-sm text-muted-foreground">{props?.email}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(props.email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className="text-sm text-muted-foreground"
      >
        {copied ? (
          <>
            <CopyCheck className="h-4 w-4" />
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default CopyEmail;
