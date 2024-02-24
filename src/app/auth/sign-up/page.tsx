import { SignUpForm } from "@/components/auth/signup-form";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    success?: boolean;
  };
};

const SignUpPage = async (props: Props) => {
  let success = props.searchParams.success;
  let session = await getServerAuthSession();

  if (session && session.user) {
    redirect("/dashboard");
  }
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/auth/sign-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Sign in
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          {success ? (
            <>
              <div className="flex flex-col items-center gap-4 py-4">
                <Icons.mailIcon className="h-12 w-12 text-primary" />
                <div>
                  <h2 className="text-center text-xl font-bold">
                    Check your email
                  </h2>
                  <p className="text-balance text-center text-muted-foreground">
                    We've sent you an email with a link to verify your account.
                  </p>
                </div>
                <Button asChild>
                  <Link href={"/auth/sign-in"}>
                    Go to sign in
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-2 text-center">
                {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <SignUpForm />

              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="hover:text-brand underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="hover:text-brand underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
