"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cities } from "@/lib/constants/cities";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { job_types } from "@/lib/constants/jobtypes";
import { useFilters } from "./utils";

export const FiltersSidebar = () => {
  let filters = useFilters((state) => state.filters);
  let setFilters = useFilters((state) => state.setFilters);
  let clearFilters = useFilters((state) => state.clearFilters);
  return (
    <div className="flex w-full flex-col space-y-8 rounded-md border bg-neutral-100/40 p-5 dark:bg-neutral-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between font-[550]">
          Search
          <Button
            onClick={() => clearFilters()}
            className="p-0 text-xs font-[550]"
            variant={"link"}
          >
            Clear
          </Button>
        </div>
        <form className="flex items-center gap-2">
          <Input name="q" placeholder="Eg: Data Scientist" />
          <Button className="px-3">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between font-[550]">
          Job Type
        </div>
        <div className="flex flex-col space-y-3">
          {Object.entries(job_types).map(([key, value]) => {
            let checked = filters.jobtype.includes(key);
            return (
              <Label
                key={key}
                className="flex items-center gap-2 font-[450] tracking-normal"
              >
                <Checkbox
                  onCheckedChange={(v) => {
                    let jobtype = filters.jobtype;
                    if (v) {
                      jobtype.push(key);
                    } else {
                      jobtype = jobtype.filter((j) => j !== key);
                    }
                    setFilters({ ...filters, jobtype });
                  }}
                  checked={checked}
                  rounded={false}
                  id={key}
                  name="jobtype"
                  value={key}
                />{" "}
                {value}
              </Label>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between font-[550]">
          Remote Friendly
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="flex items-center gap-2 font-[450] tracking-normal">
            <Switch
              checked={filters.remote}
              onCheckedChange={(v) => {
                setFilters({ ...filters, remote: v });
              }}
              name="remote"
            />
            <span className="italic text-muted-foreground">
              {filters.remote ? "On" : "Off"}
            </span>
          </Label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between font-[550]">
          Location
        </div>
        <div className="flex flex-col space-y-3">
          <Select
            value={filters.city}
            onValueChange={(v) => {
              setFilters({ ...filters, city: v });
            }}
            name="city"
          >
            <SelectTrigger>
              <SelectValue placeholder="Anywhere" />
            </SelectTrigger>
            <SelectContent>
              {cities
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
