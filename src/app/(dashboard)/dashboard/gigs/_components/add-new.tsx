"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const AddNew = () => {
  let { mutate: create, isLoading } = api.gig.createDraft.useMutation();
  let router = useRouter();

  return (
    <Button
      isLoading={isLoading}
      loadingText="Creating..."
      onClick={() => {
        create(undefined, {
          onSuccess: (data) => {
            router.push(`/dashboard/gigs/${data.id}`);
          },
        });
      }}
    >
      Create a Gig
    </Button>
  );
};

export default AddNew;
