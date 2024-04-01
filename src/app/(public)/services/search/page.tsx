import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { HomeIcon, SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SearchResults from "../_components/search-results";
type Props = {
  searchParams?: {
    q?: string;
    price_range?: string;
    delivery_time?: string;
  };
};

const SearchPage = async (props: Props) => {
  let query = props.searchParams?.q;
  let price_range = props.searchParams?.price_range;
  let delivery_time = props.searchParams?.delivery_time;

  return (
    <main className="flex w-full flex-col py-6 md:py-16">
      <div className="flex w-full items-center pb-4">
        <Breadcrumb>
          <BreadcrumbList className="sm:gap-1.5">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:underline" href="/components">
                Services
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <form method="get" className="flex items-center lg:w-1/3">
        <div className="relative flex h-10 w-full items-center py-0.5">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transform">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search services"
            className="h-full w-full border border-border pl-9"
          />
        </div>
      </form>

      <SearchResults delivery_time={delivery_time} price_range={price_range} query={query} />
    </main>
  );
};

export default SearchPage;
