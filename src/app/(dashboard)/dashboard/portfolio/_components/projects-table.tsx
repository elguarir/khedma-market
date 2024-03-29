import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PortfolioActions from "./project-actions";
import {
  TGetUserProjects,
  getUserProjects,
} from "@/server/api/routers/project";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

interface ProjectsTableProps {
  filter: string | undefined;
}
const ProjectsTable = async (props: ProjectsTableProps) => {
  let session = await getServerAuthSession();
  if (!session || !session.user) return redirect("/auth/sign-in");
  let projects = await getUserProjects(session.user.id);
  console.log("projects", projects)
  let filteredProjects = filterProjects(projects, props.filter);
  return (
    <div className="w-full">
      <ScrollArea className="max-w-full max-sm:w-[calc(100vw-50px)] max-sm:pb-3">
        <Table className="rounded-lg">
          <TableCaption>
            <div className="flex items-center justify-start"></div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:min-w-[450px] sm:w-[850px]">
                PROJECT
              </TableHead>
              <TableHead className="max-sm:min-w-[450px] sm:w-[550px]">
                STATUS
              </TableHead>
              <TableHead className="max-sm:min-w-[450px] sm:w-[550px]">
                Created At
              </TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex h-40 items-center justify-center space-x-2">
                    <QuestionMarkCircledIcon className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">No projects found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {filteredProjects.map((project, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {project.gallery.images.length > 0 ? (
                      <img
                        src={project.gallery.images[0]}
                        alt="gig image"
                        className="aspect-video h-14 rounded-[5px]"
                      />
                    ) : (
                      <div className="flex aspect-video h-14 items-center justify-center rounded-[5px] bg-muted">
                        <QuestionMarkCircledIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/dashboard/gigs/${project.id}`}
                        className="line-clamp-2 text-sm font-medium leading-tight transition-colors hover:text-primary"
                      >
                        {project.title}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "published" ? "default" : "outline"
                    }
                  >
                    {
                      {
                        published: "Published",
                        draft: "Draft",
                      }[project.status]
                    }
                  </Badge>
                </TableCell>
                <TableCell>
                  <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                </TableCell>
                <TableCell>
                  <PortfolioActions project={project} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProjectsTable;

let filterProjects = (
  projects: TGetUserProjects,
  filter: string | undefined,
) => {
  if (filter === "all" || !filter) return projects;
  return projects.filter((project) => {
    if (filter === "published") return project.status === "published";
    if (filter === "draft") return project.status === "draft";
  });
};
