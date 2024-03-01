"use client";
import axios from "axios";
import { createImageUrl } from "../utils";
import { vanilla } from "@/trpc/react";

type UploadProps = {
  file: File;
  onProgress?: (progress: number) => void;
};

export const upload = async ({ file, onProgress }: UploadProps) => {
  try {
    const { key, url } = await vanilla.file.generateUrl.mutate({
      filename: file.name,
      filetype: file.type,
    });

    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          if (onProgress) onProgress(progress);
          // console.log(`Progress: ${progress}%`);
        }
      },
    });

    return createImageUrl(key);
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return null;
  }
};
