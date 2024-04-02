import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TGetGigDetails } from "@/server/api/routers/gig";
import { ClockIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  gig: TGetGigDetails;
};

const Packages = ({ gig }: Props) => {
  if (!gig?.offersMultiplePackages)
    return (
      <div className="col-span-full h-full w-full rounded-md bg-neutral-100/0 p-4 xl:col-span-4 xl:pt-16">
        <div className="rounded-lg border">
          <div className="flex flex-col gap-6 px-6 py-4">
            <div className="flex items-center justify-between gap-2 text-lg font-semibold">
              <p>{gig?.packages.basic?.name}</p>
              <span className="text-muted-foreground">
                {gig?.packages.basic?.price} MAD
              </span>
            </div>
            <div className="flex w-full flex-col gap-4">
              <p className="text-sm font-[450] text-muted-foreground">
                {gig?.packages.basic?.description}
              </p>
              <div className="grid w-full grid-cols-2 gap-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <div className="font-medium">
                    {gig?.packages.basic?.delivery} Day delivery
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.reload className="h-4 w-4" />
                  <div className="font-medium">
                    {gig?.packages.basic?.revisions === -1
                      ? "Unlimited"
                      : gig?.packages.basic?.revisions}{" "}
                    {gig?.packages.basic?.revisions === 1
                      ? "Revision"
                      : "Revisions"}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button asChild className="w-full">
                <Link href={`/order/${gig?.owner.username}/${gig?.slug}/basic`}>
                  Order Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="col-span-full h-full w-full rounded-md bg-neutral-100/0 p-4 xl:col-span-4 xl:pt-16">
      <div>
        <Tabs defaultValue="basic" className="w-full space-y-3">
          <TabsList className="w-full border border-muted-foreground/10 xl:h-11">
            <TabsTrigger className="h-full w-full" value="basic">
              Basic
            </TabsTrigger>
            <TabsTrigger className="h-full w-full" value="standard">
              Standard
            </TabsTrigger>
            <TabsTrigger className="h-full w-full" value="premium">
              Premium
            </TabsTrigger>
          </TabsList>
          <div className="rounded-lg border">
            <TabsContent value="basic">
              <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex items-center justify-between gap-2 text-lg font-semibold">
                  <p>{gig?.packages.basic?.name}</p>
                  <span className="text-muted-foreground">
                    {gig?.packages.basic?.price} MAD
                  </span>
                </div>
                <div className="flex w-full flex-col gap-4">
                  <p className="text-sm font-[450] text-muted-foreground">
                    {gig?.packages.basic?.description}
                  </p>
                  <div className="grid w-full grid-cols-2 gap-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.basic?.delivery} Day delivery
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.reload className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.basic?.revisions === -1
                          ? "Unlimited"
                          : gig?.packages.basic?.revisions}{" "}
                        {gig?.packages.basic?.revisions === 1
                          ? "Revision"
                          : "Revisions"}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button asChild className="w-full">
                    <Link
                      href={`/order/${gig?.owner.username}/${gig?.slug}/basic`}
                    >
                      Order Now
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="standard">
              <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex items-center justify-between gap-2 text-lg font-semibold">
                  <p>{gig?.packages.standard?.name}</p>
                  <span className="text-muted-foreground">
                    {gig?.packages.standard?.price} MAD
                  </span>
                </div>

                <div className="flex w-full flex-col gap-4">
                  <p className="text-sm font-[450] text-muted-foreground">
                    {gig?.packages.standard?.description}
                  </p>
                  <div className="grid w-full grid-cols-2 gap-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.standard?.delivery} Day delivery
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.reload className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.standard?.revisions === -1
                          ? "Unlimited"
                          : gig?.packages.standard?.revisions}{" "}
                        {gig?.packages.standard?.revisions === 1
                          ? "Revision"
                          : "Revisions"}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button asChild className="w-full">
                    <Link
                      href={`/order/${gig?.owner.username}/${gig?.slug}/standard`}
                    >
                      Order Now
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="premium">
              <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex items-center justify-between gap-2 text-lg font-semibold">
                  <p>{gig?.packages.premium?.name}</p>
                  <span className="text-muted-foreground">
                    {gig?.packages.premium?.price} MAD
                  </span>
                </div>

                <div className="flex w-full flex-col gap-4">
                  <p className="text-sm font-[450] text-muted-foreground">
                    {gig?.packages.premium?.description}
                  </p>
                  <div className="grid w-full grid-cols-2 gap-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.premium?.delivery} Day delivery
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.reload className="h-4 w-4" />
                      <div className="font-medium">
                        {gig?.packages.premium?.revisions === -1
                          ? "Unlimited"
                          : gig?.packages.premium?.revisions}{" "}
                        {gig?.packages.premium?.revisions === 1
                          ? "Revision"
                          : "Revisions"}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button asChild className="w-full">
                    <Link
                      href={`/order/${gig?.owner.username}/${gig?.slug}/premium`}
                    >
                      Order Now
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Packages;
