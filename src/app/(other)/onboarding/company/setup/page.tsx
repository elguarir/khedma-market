import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import React from "react";
import CompanyForm from "../../_components/company-setup";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/helpers/user";

type Props = {};

const OnboardingPage = async (props: Props) => {
  let session = await getServerAuthSession();
  if (!session || !session.user) return redirect("/auth/sign-in");
  let dbUser = await getUserById(session.user.id);
  let company = dbUser?.companies[0];
  let hasUsername = !!dbUser?.username;
  let hasRole = !!dbUser?.role;
  if (!hasUsername || !hasRole) {
    return redirect("/onboarding");
  }
  console.log("company", company);
  if (company) {
    return redirect("/dashboard");
  }
  return (
    <main className="container flex min-h-screen w-full items-center justify-center py-16">
      <Card className="h-full w-full max-w-xl shadow-sm">
        <CardHeader>
          <CardTitle>Set up a company</CardTitle>
          <CardDescription>
            Let's get your company set up. Fill out the form below to get
            started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default OnboardingPage;
