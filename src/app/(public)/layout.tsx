import NavBar from "@/components/nav-bar";
import ProgressBarProvider from "@/components/progress-bar";
import React from "react";
import Footer from "./_components/footer";

type Props = {
  children: React.ReactNode;
};

async function PublicLayout({ children }: Props) {
  return (
    <ProgressBarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container flex min-h-[calc(100vh-69px)] w-full flex-1 px-4 py-2.5 md:px-8">
          {children}
        </div>
        <Footer />	
      </div>
    </ProgressBarProvider>
  );
}

export default PublicLayout;
