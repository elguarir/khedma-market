import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import numeral from "numeral";

export type ServiceCardProps = {
  author: {
    id: string;
    name: string | null;
    username: string | null;
    avatar: string | null;
  };
  service: {
    id: string;
    title: string | null;
    slug: string | null;
    images: string[];
    price: number | undefined;
    createdAt: Date;
  };
  numberOfReviews: number;
  rating: number;
};

export const ServiceCard = (props: ServiceCardProps) => {
  return (
    <div className="flex aspect-video flex-col gap-4">
      <Carousel className="group aspect-video h-full w-full overflow-hidden rounded-lg border shadow-sm">
        <CarouselContent>
          {props.service.images.map((src, index) => (
            <CarouselItem key={index}>
              <img key={index} src={src} className="object-cover antialiased" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 z-[4] hidden transition-all group-hover:flex" />
        <CarouselNext className="right-1 z-[4] hidden transition-all group-hover:flex" />
      </Carousel>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={props.author?.avatar ?? ""} />
            <AvatarFallback>
              {props.author?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/${props.author.username}`}
              className="text-sm font-semibold transition-colors hover:text-primary"
            >
              {props.author.name}
            </Link>
          </div>
        </div>
        <div>
          <Link
            href={`/${props.author.username}/${props.service.slug}`}
            className="line-clamp-2 font-medium leading-5 transition-colors hover:underline"
          >
            {props.service.title}
          </Link>
        </div>
        <div className="inline-flex gap-1.5">
          <div className="inline-flex gap-0.5">
            <StarFilledIcon className="h-4 w-4 text-yellow-500" />
            <div className="text-sm font-semibold">{props.rating}</div>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            ({numeral(props.numberOfReviews).format("0a")})
          </span>
        </div>
        <div>
          <div className="text-base font-bold">
            From {numeral(props.service.price).format("0,0.0")} MAD
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceCardSkeleton = () => (
  <div className="flex aspect-video flex-col gap-4">
    <Skeleton className="aspect-video w-full animate-pulse rounded-lg shadow-sm" />
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-3.5 w-full rounded-md" />
        <Skeleton className="h-3.5 w-2/3 rounded-md" />
      </div>
      <div className="inline-flex gap-1.5">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-10 rounded-md" />
      </div>
      <Skeleton className="h-4 w-24 rounded-md" />
    </div>
  </div>
);
