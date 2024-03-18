import { Separator } from "@/components/ui/separator";
import { getProjectDetails } from "@/server/api/routers/project";
import { getServerAuthSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ProjectForm from "../_components/project-form";

type Props = {
  params: {
    id: string;
  };
};

const ProjectPage = async (props: Props) => {
  let session = await getServerAuthSession();
  console.log("session", session);
  if (!session?.user || !session) {
    return redirect("/auth/sign-in");
  }
  let project = await getProjectDetails(
    props.params.id,
    session.user.id ?? undefined,
  );
  if (!project || !project.id) {
    return notFound();
  }

  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">New Project</h2>
        <p className="text-muted-foreground">
          Create a new gig to start selling your services
        </p>
      </div>
      <Separator className="my-6" />
      <div>
        <ProjectForm
          id={project.id}
          defaultValues={{
            title: project.title,
            status: project.status,
            description: project.description,
            gallery: {
              images: project.gallery.images ?? [],
              videos: project.gallery.videos ?? [],
              documents: project.gallery.documents ?? [],
            },
          }}
        />
      </div>
    </main>
  );
};

export default ProjectPage;
