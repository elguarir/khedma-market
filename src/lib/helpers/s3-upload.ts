"use client";
import axios from "axios";
import { createImageUrl } from "../utils";
import { vanilla } from "@/trpc/react";

export const upload = async (file: File) => {
  try {
    const { key, url } = await vanilla.file.generateUrl.mutate({
      filename: file.name,
      filetype: file.type,
    });

    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    
    return createImageUrl(key);
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return null;
  }
};
