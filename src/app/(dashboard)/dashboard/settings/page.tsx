import { Separator } from "@/components/ui/separator";
import { PersonalForm } from "./personal-form";
import { getUserPersonalInfo } from "@/server/api/routers/user";

export default async function SettingsProfilePage() {
  let userDetails = await getUserPersonalInfo();

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
      <PersonalForm
        defaultValues={{
          firstName: userDetails?.firstName ?? undefined,
          lastName: userDetails?.lastName ?? undefined,
          email: userDetails?.email ?? undefined,
          dob: userDetails?.dob ?? undefined,
          bio: userDetails?.bio ?? undefined,
          profilePic: userDetails?.profilePic ?? undefined,
          country: userDetails?.country ?? undefined,
          city: userDetails?.city ?? undefined,
          address: userDetails?.address ?? undefined,
          phone: userDetails?.phone ?? undefined,
          resume: userDetails?.resume ?? undefined,
        }}
      />
    </div>
  );
}
