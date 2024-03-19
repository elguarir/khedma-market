"use client";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

const GigActions = ({ id }: Props) => {
  let { mutateAsync: deleteGig } = api.gig.delete.useMutation();
  let router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus-visible:outline-primary">
          <DotsHorizontalIcon className="h-5 w-5 text-muted-foreground transition-colors duration-150  hover:text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-52">
        <DropdownMenuItem asChild className="text-muted-foreground">
          <Link href={`/dashboard/gigs/${id}`}>
            <Icons.editIcon className="mr-2 h-5 w-5" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-muted-foreground">
          <Icons.pause className="mr-2 h-5 w-5" />
          Pause
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast("Are you sure you want to delete this gig", {
              action: {
                label: "Delete",
                onClick: async () => {
                  await deleteGig(
                    { id },
                    {
                      onSuccess: () => {
                        toast.success("Gig deleted!");
                        router.refresh();
                      },
                      onError: () => toast.error("Failed to delete gig"),
                    },
                  );
                },
              },
            });
          }}
          className="text-muted-foreground"
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GigActions;
