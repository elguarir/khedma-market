import localFont from "next/font/local";

export const jimmySerif = localFont({
  src: [
    {
      weight: "500",
      path: "./jimmy-serif/Regular.otf",
      style: "normal",
    },
    {
      weight: "700",
      path: "./jimmy-serif/Bold.otf",
      style: "normal",
    },
  ],
});
