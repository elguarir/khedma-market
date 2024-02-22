import { getUserByUsername } from "@/lib/helpers/user";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

const UserProfile = async (props: Props) => {
  let user = await getUserByUsername(props.params.username);
  if (!user) {
    return notFound();
  }
  return (
    <main className="container flex flex-col py-12">
      <h1 className="text-4xl font-semibold">
        This is {user.username} profile page. Their name is {user.name}.
      </h1>
    </main>
  );
};

export default UserProfile;
