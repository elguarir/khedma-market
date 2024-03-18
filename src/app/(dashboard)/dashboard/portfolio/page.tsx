import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNew from "./_components/add-new";
import ProjectsTable from "./_components/projects-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
interface PortfolioPageProps {
  searchParams: {
    filter: string;
  };
}
const PortfolioPage = (props: PortfolioPageProps) => {
  return (
    <main>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-2 max-sm:flex-col">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Protfolio</h2>
            <p className="text-muted-foreground">
              bellow you can view, create and manage your projects
            </p>
          </div>
          <div className="flex items-center justify-end max-sm:w-full">
            <AddNew />
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="py-3">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger asChild value="all">
              <Link href={"/dashboard/portfolio"}>All</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="draft">
              <Link href={`/dashboard/portfolio?filter=draft`}>Draft</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="published">
              <Link href={`/dashboard/portfolio?filter=published`}>
                Published
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <ProjectsTable filter={props.searchParams.filter} />
      </div>
    </main>
  );
};

export default PortfolioPage;
