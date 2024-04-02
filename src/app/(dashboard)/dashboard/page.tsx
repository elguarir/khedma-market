import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import React from "react";
import MaxWidthWrapper from "./_components/max-width-wrapper";
import { DailyImpressions } from "./_components/daily-impressions";
import { useUserRole } from "@/lib/helpers/use-user-role";
import { DailyApplications } from "./_components/daily-applications";
import CompanyDashboard from "./_components/company-dashboard";
import FreelancerDashboard from "./_components/freelancer-dashboard";

type Props = {};

const DashboardPage = async (props: Props) => {
  let user = await getServerAuthSession();
  let role = await useUserRole();
  return (
    <MaxWidthWrapper>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Howdy, <span className="text-primary">{user?.user?.name}</span>!
        </h2>
      </div>
      <Separator className="my-6" />
      <div className="flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {role === "company" ? <CompanyDashboard /> : <FreelancerDashboard />}
      </div>
    </MaxWidthWrapper>
  );
};

export default DashboardPage;
