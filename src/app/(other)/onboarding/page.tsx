import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import React from "react";
import OnboardingForm from "./_components/onboarding-form";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/helpers/user";

type Props = {};

const OnboardingPage = async (props: Props) => {
  let session = await getServerAuthSession();
  if (!session || !session.user) return redirect("/auth/sign-in");
  let dbUser = await getUserById(session.user.id);
  let hasUsername = !!dbUser?.username;
  let hasRole = !!dbUser?.role;
  if (hasUsername && hasRole) {
    return redirect("/dashboard");
  }
  return (
    <main className="container flex min-h-screen w-full items-center justify-center py-16">
      <Card className="h-full w-full max-w-xl shadow-sm">
        <CardHeader>
          <CardTitle>Set up your account</CardTitle>
          <CardDescription>
            Let's get you started with your new account, we just need a few more
            details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default OnboardingPage;
