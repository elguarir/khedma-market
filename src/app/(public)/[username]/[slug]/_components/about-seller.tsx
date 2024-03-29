import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserDetails } from "@/server/api/routers/gig";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
type Props = {
  id: string;
};

const AboutSeller = async (props: Props) => {
  let seller = await getUserDetails(props.id);
  if (!seller) return null;
  return (
    <div className="flex w-full flex-col gap-8">
      <h3 className="text-2xl font-semibold">About the seller</h3>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={seller.image ?? ""} />
            <AvatarFallback>
              <img src="/images/placeholder.png" alt="" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{seller.name}</h2>
            <div className="flex items-center gap-2">
              {!Number.isNaN(seller.rating) && (
                <div className="flex items-center gap-0.5">
                  <StarFilledIcon className="h-4 w-4" />
                  {seller.rating}
                </div>
              )}
              ({seller.numberOfReviews} reviews)
            </div>
          </div>
        </div>
        <div>
          <Button variant={"outline"}>Contact Me</Button>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 lg:gap-y-6 rounded-lg border p-4 shadow-sm lg:grid-cols-2">
        <div className="flex w-full flex-col gap-0.5">
          <h4 className="text-muted-foreground">From</h4>
          <div className="flex flex-wrap gap-1">
            <p className="text-lg font-semibold capitalize">
              {seller.country}, {seller.city}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-0.5">
          <h4 className="text-muted-foreground">Member since</h4>
          <div className="flex flex-wrap gap-1">
            <p className="text-lg font-semibold capitalize">
              {format(new Date(seller.createdAt), "MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-0.5">
          <h4 className="text-muted-foreground">Languages</h4>
          <div className="flex flex-wrap gap-1">
            <>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <p className="text-lg font-semibold">
                    {seller.languages
                      .slice(0, 4)
                      .map((lang) => lang.language.name)
                      .join(", ")}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="hidden lg:block">
                  <div className="flex w-48 flex-col gap-1">
                    <h4 className="text-sm font-medium">Seller speaks:</h4>
                    <div className="-gap-y-0.5 grid">
                      {seller.languages.map((lang) => (
                        <p key={lang.language.id}>
                          {lang.language.name} (
                          {
                            {
                              basic: "Basic",
                              conversational: "Conversational",
                              fluent: "Fluent",
                              native_or_bilingual: "Native/Bilingual",
                            }[lang.level]
                          }
                          )
                        </p>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </>
          </div>
        </div>

        <div className="flex w-full flex-col gap-0.5">
          <h4 className="text-muted-foreground">Skills</h4>
          <div className="flex flex-wrap gap-1">
            <p className="text-lg font-semibold">
              {seller.skills
                .slice(0, 4)
                .map((skill) => skill.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <Separator className="col-span-full" />
        <div className="col-span-full flex w-full flex-col">
          <div className="flex flex-wrap gap-1">
            <p className="text-lg font-semibold">{seller.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSeller;
