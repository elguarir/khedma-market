"use client";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { upload } from "@/lib/helpers/s3-upload";

type Props = {
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
};

const UploadInput = ({ value, onChange }: Props) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file) return;
      const url = await upload(file);
      console.log("url", url);
      if (onChange && url) onChange(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={cn(
        "flex items-center w-full gap-3 rounded-lg border-2 border-dashed border-border p-2 text-sm transition-colors duration-200",
        isDragActive && "border-primary",
      )}
      {...getRootProps()}
    >
      <Button type="button" className="h-8" size={"sm"} variant={"outline"}>
        Select File
      </Button>
      <div className="flex items-center gap-1.5">
        <Icons.uploadIcon className="h-5 w-5" />
        <span className=" text-xs font-medium text-muted-foreground">
          Drop Files here...
        </span>
      </div>

      <input {...getInputProps()} />
    </div>
  );
};

export default UploadInput;
