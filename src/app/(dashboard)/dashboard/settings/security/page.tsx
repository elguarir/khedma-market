import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";
import { getUserSecurityInfo } from "@/server/api/routers/user";

export default async function SettingsAccountPage() {
  let accountsDetails = await getUserSecurityInfo();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings and security preferences.
        </p>
      </div>
      <Separator />
      <AccountForm
        hasPassword={accountsDetails?.password ? true : false}
        defaultValues={{
          username: accountsDetails?.username ?? undefined,
          isTwoFactorEnabled: accountsDetails?.isTwoFactorEnabled ?? undefined,
        }}
      />
    </div>
  );
}
