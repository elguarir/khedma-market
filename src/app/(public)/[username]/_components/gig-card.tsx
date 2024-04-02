import Link from "next/link";
import GigActions from "./gig-actions";
import { Icons } from "@/components/icons";

interface GigCardProps {
  id: string;
  username: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  isAbleToEdit: boolean;
}
export const GigCard = (props: GigCardProps) => {
  if (!props.isAbleToEdit) {
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
              href={`/${props.username}/${props.slug}`}
              className="line-clamp-2 text-sm font-medium leading-none transition-colors duration-200 hover:text-primary"
            >
              {props.title}
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4 py-2">
            <div className="text-sm">
              <span className="text-[10px] font-[450] uppercase">
                Starting at
              </span>{" "}
              <span className="font-semibold">
                {props.price?.toLocaleString("en-MA", {
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
  }

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
            href={`/${props.username}/${props.slug}`}
            className="line-clamp-2 text-sm font-medium leading-none transition-colors duration-200 hover:text-primary"
          >
            {props.title}
          </Link>
        </div>
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div>
            <GigActions id={props.id} />
          </div>
          <div className="text-sm">
            <span className="text-[10px] font-[450] uppercase">
              Starting at
            </span>{" "}
            <span className="font-semibold">
              {props.price?.toLocaleString("en-MA", {
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
