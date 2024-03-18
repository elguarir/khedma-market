"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TGetUserProjects } from "@/server/api/routers/project";

type Props = {
  project: TGetUserProjects[0];
};

const PortfolioActions = ({ project }: Props) => {
  let { mutateAsync: deleteProject, isLoading } = api.project.delete.useMutation();
  let router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <DotsHorizontalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link className="w-full" href={`/dashboard/portfolio/${project.id}/`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={() => {
            toast.promise(
              deleteProject(
                { id: project.id },
                { onSuccess: () => router.refresh() },
              ),
              {
                loading: "Deleting project...",
                success: "Project deleted successfully!",
                error: "Failed to delete project",
              },
            );
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PortfolioActions;
