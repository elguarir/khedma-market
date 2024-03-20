import NavBar from "@/components/nav-bar";
import ProgressBarProvider from "@/components/progress-bar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function PublicLayout({ children }: Props) {
  return (
    <ProgressBarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container flex min-h-[calc(100vh-69px)] w-full flex-1 py-2.5 max-md:px-6 ">
          {children}
        </div>
      </div>
    </ProgressBarProvider>
  );
}

export default PublicLayout;
