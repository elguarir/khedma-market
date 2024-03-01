"use client";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { upload } from "@/lib/helpers/s3-upload";
import { Loader2 } from "lucide-react";

type Props = {
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
};

const UploadInput = ({ value, onChange }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file) return;
      setIsLoading(true);
      const url = await upload({
        file,
        onProgress: (progress) => setProgress(progress),
      });
      setIsLoading(false);
      setProgress(0);
      console.log("url", url)
      if (onChange && url) onChange(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isLoading,
  });

  return (
    <div
      className={cn(
        "relative flex w-full items-center gap-3 overflow-hidden rounded-lg border-2 border-dashed border-border p-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:outline-primary",
        isDragActive && "border-primary",
      )}
      {...getRootProps()}
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full  bg-green-700/20 text-green-700 transition-all duration-200 dark:bg-green-700/20 dark:text-green-500/80",
          !isLoading && "hidden w-0",
        )}
        style={{ width: `${progress}%` }}
      />

      <Button type="button" className="h-8" size={"sm"} variant={"outline"}>
        Select File
      </Button>
      <div className="flex w-full items-center justify-between gap-1.5">
        <div className="flex w-full items-center gap-1.5">
          <Icons.uploadIcon className="h-5 w-5" />
          <span className=" text-xs font-medium text-muted-foreground">
            {isLoading ? "Uploading..." : "Drop Files here..."}
          </span>
        </div>
        {isLoading && (
          <div className="pr-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
      </div>

      <input {...getInputProps()} />
    </div>
  );
};

export default UploadInput;
