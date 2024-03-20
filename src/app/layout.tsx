import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { jimmySerif } from "@/lib/fonts";

export const metadata = {
  title: "Khedma market",
  description:
    "Khedma market is a moroccan marketplace for freelancers, clients and businesses. Find the best freelancers and get your job done.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${GeistMono.variable}`}>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
          </ThemeProvider>
          <Toaster closeButton />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
