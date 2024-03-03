import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserByUsername } from "@/lib/helpers/user";
import { notFound } from "next/navigation";
import React from "react";
import { DisplayNameChangeModal } from "./_components/display-name-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { format } from "date-fns";
import DescriptionForm from "./_components/description-form";
import LanguagesForm from "./_components/languages-form";
import {
  getUserDescription,
  getUserLanguages,
} from "@/server/api/routers/profile";

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

  let languages = await getUserLanguages(user.id);
  let description = await getUserDescription(user.id);
  return (
    <main className="flex min-h-[calc(100vh-90px)] w-full flex-col py-8">
      <div className="grid h-full w-full grid-cols-12">
        <div className="col-span-12 flex h-fit w-full flex-col items-center gap-6 rounded-sm md:col-span-5 lg:col-span-4 xl:col-span-3">
          <Card className="flex w-full gap-3 rounded-sm">
            <CardContent className="flex w-full flex-col gap-4 p-5 py-8">
              <div className="flex w-full flex-col items-center gap-4">
                <Avatar className="h-28 w-28 rounded-full border">
                  <AvatarImage src={user.profilePic ?? ""} />
                  <AvatarFallback className="text-2xl">MO</AvatarFallback>
                </Avatar>
                <div className="w-full text-center">
                  <DisplayNameChangeModal displayName={user.name} />
                  <p className="text-sm font-medium text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              <Button className="w-full" variant={"outline"} asChild>
                <Link href={`/${user.username}?public=true`}>
                  Preview Profile
                </Link>
              </Button>
              <Separator />
              <div className="grid w-full gap-1 text-sm">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-muted-foreground">
                    <Icons.Location className="h-4 w-4" />
                    From
                  </div>
                  <div className="font-semibold">
                    {user.country ?? "No location set"}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-muted-foreground">
                    <Icons.user className="h-4 w-4" />
                    Member since
                  </div>
                  <div className="font-semibold">
                    {/* May 2021 */}
                    {format(new Date(user.createdAt), "MMMM yyyy")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex w-full gap-3 rounded-sm">
            <CardContent className="flex w-full flex-col gap-6 p-5 py-8">
              <div className="grid w-full gap-2">
                <DescriptionForm description={description} />
              </div>
              <Separator />
              <div className="grid w-full gap-2">
                <LanguagesForm languages={languages} />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* gigs section */}
        <div className="col-span-12 h-full w-full md:col-span-7 lg:col-span-8 xl:col-span-9"></div>
      </div>
    </main>
  );
};

export default UserProfile;
