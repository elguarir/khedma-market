"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const AddNew = () => {
  let { mutate: create, isLoading } = api.project.createDraft.useMutation();
  let router = useRouter();

  return (
    <Button
      isLoading={isLoading}
      loadingText="Creating..."
      onClick={() => {
        create(undefined, {
          onSuccess: (data) => {
            console.log("data", data);
            router.push(`/dashboard/portfolio/${data.id}`);
          },
        });
      }}
    >
      Add a project
    </Button>
  );
};

export default AddNew;
