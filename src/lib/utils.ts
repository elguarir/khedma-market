import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createImageUrl = (key: string) => {
  const url = `https://khedma-market.s3.amazonaws.com/${key}`;
  return url;
};

export const youcan = axios.create({
  baseURL: "https://youcanpay.com/sandbox/api",
  headers: {
    Accept: "application/json",
  },
});