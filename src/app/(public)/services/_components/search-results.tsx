"use client";
import React, { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  ServiceCard,
  ServiceCardProps,
  ServiceCardSkeleton,
} from "./service-card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { X } from "lucide-react";

type Props = {
  query?: string;
  price_range?: string;
  delivery_time?: string;
};

const SearchResults = (props: Props) => {
  const [min, max] = props.price_range?.split("-") || [0, 1000];

  const [priceOpen, setPriceOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [range, setRange] = useState([Number(min) || 0, Number(max) || 1000]);
  const [deliveryTime, setDeliveryTime] = useState<string | undefined>(
    props.delivery_time,
  );

  let deliveryTimes = [
    {
      label: "Any time",
      value: "any_time",
    },
    {
      label: "Less than 7 days",
      value: "less_than_week",
    },
    {
      label: "Less than 21 days",
      value: "less_than_3week",
    },
  ];

  const handleRangeChange = (value: any) => {
    setRange(value);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
        return params.toString();
      }
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  let services = [
    {
      author: {
        avatar:
          "https://fiverr-res.cloudinary.com/image/upload/v1/attachments/profile/photo/fbab78f482a1b26348e956cb132afd5a-1659973799034/d50ef9e4-9102-4d6a-872f-899dbb8a1757.jpg",
        id: "1",
        name: "Ahmed Maz",
        username: "ahmedmaz",
      },
      service: {
        id: "1",
        title:
          "I will make web apps using react, nextjs, nodejs or any other backend",
        createdAt: "2021-09-01T00:00:00.000Z",
        price: 80,
        images: [
          "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/282410535/original/92179208da509fd438e7baf36d659e3936f96179/make-web-apps-using-react-nextjs-nodejs-or-any-other-backend.png",
        ],
      },
      numberOfReviews: 39,
      rating: 4.5,
    },
    {
      author: {
        avatar:
          "https://fiverr-res.cloudinary.com/attachments/profile/photo/06a3d2ab90dbd3cb729930b1ba5acbaa-991539391674554543481/JPEG_20230124_153222_2646298220152317127.jpg",
        id: "1",
        name: "Darshan",
        username: "darshan",
      },
      service: {
        id: "1",
        title:
          "I will build, rebuild, redesign wordpress website or wordpress elementor website design",
        createdAt: "2021-09-01T00:00:00.000Z",
        price: 50.5,
        images: [
          "https://fiverr-res.cloudinary.com/gigs/189055476/original/5b809b0a85e30a57c311470a7aabaaa086d579cf.jpg",
          "https://fiverr-res.cloudinary.com/gigs2/189055476/original/98ff0fbb6b0a57f612b64cf6f4ef3059c0c351db.jpg",
        ],
      },
      numberOfReviews: 1250,
      rating: 4.2,
    },

    {
      author: {
        avatar:
          "https://fiverr-res.cloudinary.com/image/upload/v1/attachments/profile/photo/fbab78f482a1b26348e956cb132afd5a-1659973799034/d50ef9e4-9102-4d6a-872f-899dbb8a1757.jpg",
        id: "1",
        name: "Ahmed Maz",
        username: "ahmedmaz",
      },
      service: {
        id: "1",
        title: "I will be your nextjs supabase developer",
        createdAt: "2021-09-01T00:00:00.000Z",
        price: 100,
        images: [
          "https://fiverr-res.cloudinary.com/images/gigs/321016864/original/1385874fd1ce69b867896e59e6fd55ad03d2b7f3/be-your-nextjs-supabase-developer.png",
        ],
      },
      numberOfReviews: 39,
      rating: 4.5,
    },
  ] as ServiceCardProps[];

  return (
    <div className="flex flex-col space-y-4 py-6">
      <h1 className="text-3xl font-semibold text-lime-950 dark:text-lime-50 md:text-4xl">
        Results {props.query ? `for "${props.query}"` : ""}
      </h1>
      <div className="flex w-full items-center gap-2">
        <Popover open={priceOpen} onOpenChange={setPriceOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="group flex w-fit min-w-28 items-center justify-between gap-2"
            >
              {range[0] === 0 && range[1] === 1000
                ? "Price"
                : `${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "MAD",
                    minimumFractionDigits: 0,
                  }).format(range[0]!)} - ${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "MAD",
                    minimumFractionDigits: 0,
                  }).format(range[1]!)}`}
              <ChevronDownIcon className="h-4 w-4 opacity-50 transition-all duration-300 group-[[aria-expanded=true]]:rotate-180" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-[400px] max-w-full flex-col space-y-5"
          >
            <h3 className="text-lg font-medium">Price</h3>
            <div className="flex flex-col gap-5">
              <div className="w-full pr-1.5">
                <Label className="flex flex-col gap-3">
                  Select range
                  <Slider
                    max={1000}
                    min={0}
                    minStepsBetweenThumbs={5}
                    step={5}
                    value={range}
                    onValueChange={handleRangeChange}
                    formatLabel={(value) => {
                      if (value < 1000) {
                        return new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "MAD",
                          minimumFractionDigits: 1,
                        }).format(value);
                      } else return "MAD 1K+";
                    }}
                  />
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Label className="flex flex-col gap-1">
                  Min.
                  <Input
                    type="number"
                    step={5}
                    value={range[0]}
                    onChange={(e) =>
                      setRange([Number(e.target.value), range[1] ?? 1000])
                    }
                    className="w-full rounded-md border border-border p-2"
                  />
                </Label>
                <Label className="flex flex-col gap-1">
                  Max.
                  <Input
                    type="number"
                    step={5}
                    value={range[1]}
                    onChange={(e) =>
                      setRange([range[0] ?? 0, Number(e.target.value)])
                    }
                    className="w-full rounded-md border border-border p-2"
                  />
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={() => {
                  let newurl = `${pathname}?${createQueryString("price_range", "0-1000")}`;
                  router.push(newurl);
                  setRange([0, 1000]);
                  setPriceOpen(false);
                }}
                variant={"outline"}
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  let newurl = `${pathname}?${createQueryString("price_range", `${range[0]}-${range[1]}`)}`;
                  router.push(newurl);
                  setPriceOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover open={deliveryOpen} onOpenChange={setDeliveryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="group flex w-44 items-center justify-between gap-2"
            >
              {deliveryTime
                ? `${deliveryTimes.find((dv) => dv.value === deliveryTime)?.label}`
                : "Delivery Time"}
              <ChevronDownIcon className="h-4 w-4 opacity-50 transition-all duration-300 group-[[aria-expanded=true]]:rotate-180" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-[400px] max-w-full flex-col space-y-5"
          >
            <h3 className="text-lg font-medium">Delivery Time</h3>
            <div className="flex flex-col gap-5">
              <RadioGroup.Root
                value={deliveryTime}
                onValueChange={(v) => setDeliveryTime(v)}
                className="flex flex-col gap-2.5"
                defaultValue="any_time"
              >
                {deliveryTimes.map((dv) => (
                  <div key={dv.value} className="flex items-center gap-2">
                    <RadioGroup.Item
                      className="h-[20px] w-[20px] cursor-default rounded-full border-[1.5px] border-input bg-white shadow-sm outline-none transition-colors hover:border-primary-dark/30 xl:border-2"
                      value={dv.value}
                      id={dv.value}
                    >
                      <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[9px] after:w-[9px] after:rounded-[50%] after:bg-primary after:content-['']" />
                    </RadioGroup.Item>
                    <Label htmlFor={dv.value}>{dv.label}</Label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={() => {
                  let newurl = `${pathname}?${createQueryString("delivery_time", "")}`;
                  router.push(newurl);
                  setDeliveryOpen(false);
                }}
                variant={"outline"}
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  if (!deliveryTime || deliveryTime === "any_time") {
                    let newurl = `${pathname}?${createQueryString("delivery_time", "")}`;
                    router.push(newurl);
                    setDeliveryOpen(false);
                    return;
                  }
                  let newurl = `${pathname}?${createQueryString("delivery_time", deliveryTime)}`;
                  router.push(newurl);
                  setDeliveryOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        {(props.price_range || props.delivery_time) && (
          <Button
            variant={"ghost"}
            onClick={() => {
              if (!props.query) {
                router.push(pathname);
                setRange([0, 1000]);
                setDeliveryTime(undefined);
                return;
              }
              setRange([0, 1000]);
              setDeliveryTime(undefined);
              let newurl = `${pathname}?q=${props.query}`;
              console.log("newurl", newurl);
              router.push(newurl);
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-x-6 gap-y-8 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard {...service} />
        ))}
        {new Array(2).fill(0).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
