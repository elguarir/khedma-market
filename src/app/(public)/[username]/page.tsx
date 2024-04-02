import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { getUserGigsByUsername } from "@/server/api/routers/gig";
import { GigCard } from "./_components/gig-card";
import { getServerAuthSession } from "@/server/auth";
import { Mail } from "lucide-react";

type Props = {
  params: {
    username: string;
  };
  searchParams: {
    public: string;
  };
};

const UserProfile = async (props: Props) => {
  let user = await getUserByUsername(props.params.username);
  if (user === null || !user.username) {
    return notFound();
  }

  let session = await getServerAuthSession();
  let isOwner = user.id === session?.user.id;
  let gigs = await getUserGigsByUsername(user.username);
  let languages = await getUserLanguages(user.id);
  let skills = await getUserSkills(user.id);
  let description = await getUserDescription(user.id);
  if (isOwner && props.searchParams.public !== "true") {
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
                </div>
              </TabsList>
              <TabsContent
                className="grid grid-cols-1 gap-6 px-1.5 py-6 lg:grid-cols-3"
                value="active_gigs"
              >
                {gigs
                  .filter((gig) => gig.status === "published")
                  .map((gig, i) => (
                    <GigCard
                      key={gig.id}
                      id={gig.id}
                      isAbleToEdit={isOwner && props.searchParams.public !== "true"}
                      username={user!.username!}
                      image={gig.attachaments.images[0]?.url ?? ""}
                      title={gig.title!}
                      slug={gig.slug!}
                      price={gig.packages.basic?.price!}
                    />
                  ))}
                <Link
                  href={"/dashboard/gigs/new"}
                  className="relative flex h-full w-full items-center justify-center rounded-lg border border-input py-14"
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
            </Tabs>
          </div>
        </div>
      </main>
    );
  }

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
                  <CardTitle className="text-center">{user.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              <Button className="w-full" variant={"outline"}>
                <Mail className="mr-2 h-4 w-4" />
                Contact
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
                <CardTitle className="flex w-full items-center justify-between">
                  Description
                </CardTitle>
                {description?.description ? (
                  <div>
                    <p className="text-sm font-normal text-muted-foreground">
                      {description.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-normal text-muted-foreground">
                      No description set
                    </p>
                  </div>
                )}
              </div>
              <Separator />
              <div className="grid w-full gap-2">
                <CardTitle className="flex w-full items-center justify-between">
                  Languages
                </CardTitle>
                {languages?.length !== 0 && (
                  <div className="grid w-full gap-1.5 py-2">
                    {languages?.map((language) => (
                      <div
                        key={language.value}
                        className="group flex w-full items-center justify-between"
                      >
                        <div className="inline-flex flex-1 gap-1">
                          <p className="text-sm font-normal">
                            {language.label}{" "}
                            {language?.nativeName && (
                              <span className="font-[550]">
                                ({language.nativeName})
                              </span>
                            )}
                            {" - "}
                            <span className="text-muted-foreground">
                              {
                                {
                                  basic: "Basic",
                                  conversational: "Conversational",
                                  fluent: "Fluent",
                                  native_or_bilingual: "Native/Bilingual",
                                }[language.level]
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages?.length === 0 && (
                  <p className="text-sm font-normal text-muted-foreground">
                    No languages set
                  </p>
                )}
              </div>
              <Separator />
              <div className="grid w-full gap-2">
                <CardTitle className="flex w-full items-center justify-between">
                  Skills
                </CardTitle>
                {skills?.length === 0 ? (
                  <p className="text-sm font-normal text-muted-foreground">
                    No skills set
                  </p>
                ) : (
                  <div className="grid w-full gap-1.5 py-2">
                    {skills?.map((skill) => (
                      <div
                        key={skill.value}
                        className="group flex w-full items-center justify-between"
                      >
                        <div className="inline-flex flex-1 gap-1">
                          <p className="text-sm font-normal">
                            {skill.name} {" - "}
                            <span className="text-muted-foreground">
                              {
                                {
                                  beginner: "Beginner",
                                  intermediate: "Intermediate",
                                  expert: "Expert",
                                }[skill.level]
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              </div>
            </TabsList>
            <TabsContent
              className="grid grid-cols-1 gap-6 px-1.5 py-6 lg:grid-cols-3"
              value="active_gigs"
            >
              {gigs
                .filter((gig) => gig.status === "published")
                .map((gig, i) => (
                  <GigCard
                    key={gig.id}
                    id={gig.id}
                    isAbleToEdit={isOwner && props.searchParams.public !== "true"}
                    username={user!.username!}
                    image={gig.attachaments.images[0]?.url ?? ""}
                    title={gig.title!}
                    slug={gig.slug!}
                    price={gig.packages.basic?.price!}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
