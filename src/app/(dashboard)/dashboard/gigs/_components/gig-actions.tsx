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
import { TFormmatedGigs } from "./gigs-table";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  gig: TFormmatedGigs[0];
};

const GigActions = ({ gig }: Props) => {
  let { mutateAsync: deleteGig, isLoading } = api.gig.delete.useMutation();
  let router = useRouter();
  let utils = api.useUtils();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <DotsHorizontalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link className="w-full" href={`/dashboard/gigs/${gig.id}/`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled={gig.status !== "published"}>
          <Link className="w-full" href={`/${gig.owner.username}/${gig.slug}/`}>
            Preview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={() => {
            toast("Are you sure you want to delete this gig?", {
              action: {
                label: "Delete",
                onClick: () => {
                  toast.promise(
                    deleteGig(
                      { id: gig.id },
                      { onSuccess: () => router.refresh() },
                    ),
                    {
                      loading: "Deleting gig...",
                      success: "Gig deleted successfully!",
                      error: "Failed to delete gig",
                    },
                  );
                },
              },
            });
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GigActions;
