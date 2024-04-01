import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const useUserRole = async () => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/auth/sign-in");
  }
  return session.user.role;
};
