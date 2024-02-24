import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignInForm } from "@/components/auth/signin-form";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  let session = await getServerAuthSession();

  if (session && session.user) {
    redirect("/dashboard");
  }
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex items-center gap-3">
          <img src="/dark/logo-dark.png" className="h-8" alt="" />
        </div>
        <div className="flex flex-col space-y-1">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm font-[450] text-muted-foreground">
            Don't have an account?
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
