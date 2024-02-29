import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createImageUrl = (key: string) => {
  const url = `https://khedma-market.s3.amazonaws.com/${key}`;
  return url;
};
