import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  ToolTipArrow,
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
  getUserSkills,
} from "@/server/api/routers/profile";
import SkillsForm from "./_components/skills-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
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
  let skills = await getUserSkills(user.id);
  let description = await getUserDescription(user.id);
  let gigs = [
    {
      title: "I will create serverless aws amplify and react app",
      price: 500,
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/255407634/original/1cd25fb052f234958b8f00277036091d545fc7a6/create-serverless-aws-amplify-and-react-app.png",
    },
    {
      title: "I will build firebase reactjs nextjs app for you",
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/185170484/original/5d11fa2b7cde89a8ad1a61d73715bf60e076b432/build-firebase-reactjs-nextjs-app-for-you.png",
      price: 750,
    },
  ];

  return (
    <main className="flex min-h-[calc(100vh-90px)] w-full flex-col py-8">
      <div className="grid h-full w-full grid-cols-12 gap-6">
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
              <Separator />
              <div className="grid w-full gap-2">
                <SkillsForm skills={skills} />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* gigs section */}
        <div className="col-span-12 flex h-full w-full flex-col rounded-md md:col-span-7 lg:col-span-8 lg:p-8 lg:pt-0 xl:col-span-9">
          <Tabs defaultValue="active_gigs" className="w-full">
            <TabsList className="flex w-full items-center justify-between rounded-none border-b bg-inherit px-0 py-3">
              <div className="space-x-1">
                <TabsTrigger
                  className="relative py-1.5 transition-all duration-200 after:pointer-events-none after:absolute after:bottom-[-0.2rem] after:hidden after:h-0.5 after:w-full after:bg-primary-dark hover:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:after:block data-[state=active]:after:content-[''] data-[state=active]:hover:bg-secondary dark:hover:bg-muted"
                  value="active_gigs"
                >
                  Active gigs
                </TabsTrigger>
                <TabsTrigger
                  className="relative py-1.5 transition-all duration-200 after:pointer-events-none after:absolute after:bottom-[-0.2rem] after:hidden after:h-0.5 after:w-full after:bg-primary-dark hover:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:after:block data-[state=active]:after:content-[''] data-[state=active]:hover:bg-secondary dark:hover:bg-muted"
                  value="paused_gigs"
                >
                  Paused gigs
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent
              className="grid grid-cols-1 gap-6 px-1.5 py-6 md:grid-cols-2 lg:grid-cols-3"
              value="active_gigs"
            >
              {gigs.map((gig, i) => (
                <GigCard
                  key={i}
                  image={gig.image}
                  title={gig.title}
                  price={gig.price}
                />
              ))}
              <Link
                href={"/dashboard/gigs/new"}
                className="relative flex h-full w-full items-center justify-center rounded-lg border border-input"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-foreground text-background">
                    <Icons.add className="h-8 w-8" />
                  </div>
                  <div className="w-full text-center">
                    <p className="font-semibold">Create a new gig</p>
                  </div>
                </div>
              </Link>
            </TabsContent>
            <TabsContent className="px-1.5 py-6" value="paused_gigs">
              <div className="grid w-full gap-2"></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;

interface GigCardProps {
  title: string;
  price: number;
  image: string;
}
const GigCard = (props: GigCardProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-input">
      <div className="flex h-full w-full flex-col">
        <img
          src={props.image}
          className="aspect-video w-full object-cover"
          alt="gig image"
        />
        <div className="w-full px-4 py-3">
          <Link
            href={"#"}
            className="line-clamp-2 text-sm font-medium leading-none transition-colors duration-200 hover:text-primary"
          >
            {props.title}
          </Link>
        </div>
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div>
            <button className="focus-visible:outline-primary">
              <DotsHorizontalIcon className="h-5 w-5 text-muted-foreground transition-colors duration-150  hover:text-foreground" />
            </button>
          </div>
          <div className="text-sm">
            <span className="text-[10px] font-[450] uppercase">
              Starting at
            </span>{" "}
            <span className="font-semibold">
              {props.price.toLocaleString("en-MA", {
                style: "currency",
                currency: "MAD",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-1 top-1">
        <button className="rounded-full bg-background bg-neutral-100 p-1.5 text-neutral-600 shadow-sm transition-colors duration-200 hover:text-neutral-800 focus-visible:outline-primary">
          <Icons.share className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
