"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarList, Card } from "@tremor/react";
import { useState } from "react";

const data = [
  {
    name: "Agadir",
    value: 456,
  },
  {
    name: "Casablanca",
    value: 351,
  },
  {
    name: "Rabat",
    value: 271,
  },
  {
    name: "Mouhammedia",
    value: 191,
  },
  {
    name: "Marakech",
    value: 91,
  },
];

interface ApplicationsByCitiesProps {
  chartdata: {
    name: string;
    value: number;
  }[];
}

export function ApplicationsByCities(props:ApplicationsByCitiesProps) {
  let [sortOrder, setSortOrder] = useState<"descending" | "ascending">(
    "descending",
  );

  return (
    <Card className="mx-auto w-full max-md:px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Applications by Cities
        </h3>

        <Select
          value={sortOrder}
          defaultValue="descending"
          onValueChange={(v) => {
            setSortOrder(v as "descending" | "ascending");
          }}
        >
          <SelectTrigger className="w-fit gap-2">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="descending">Descending</SelectItem>
            <SelectItem value="ascending">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-4 flex items-center justify-between">
        <span>City</span>
        <span>Applications</span>
      </p>
      <BarList sortOrder={sortOrder} data={props.chartdata} className="mt-2" />
    </Card>
  );
}
