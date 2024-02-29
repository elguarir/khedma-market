import { Separator } from "@/components/ui/separator";
import { PersonalForm } from "./personal-form";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export default async function SettingsProfilePage() {
  let session = await getServerAuthSession();
  let details = await db.user.findFirst({
    where: {
      id: session?.user.id!,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          These details are not shared publicly, only when applying for job
          offers.
        </p>
      </div>
      <Separator />
      <PersonalForm />
    </div>
  );
}
