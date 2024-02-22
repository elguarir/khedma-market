import { getServerAuthSession } from "@/server/auth";
import React from "react";

const Dashboard = async () => {
  let session = await getServerAuthSession();
  return (
    <div className="flex h-full min-h-screen w-full flex-col p-5 text-foreground">
      <h1 className="text-xl font-semibold tracking-normal">Dashboard</h1>
      <p className="text-sm font-medium text-muted-foreground">
        Hello, {session?.user.name} 👋
      </p>
    </div>
  );
};

export default Dashboard;
