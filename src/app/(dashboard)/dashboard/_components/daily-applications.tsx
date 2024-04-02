"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaChart, Card } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 23",
    Applications: 167,
  },
  {
    date: "Feb 23",
    Applications: 125,
  },
  {
    date: "Mar 23",
    Applications: 156,
  },
  {
    date: "Apr 23",
    Applications: 165,
  },
  {
    date: "May 23",
    Applications: 153,
  },
  {
    date: "Jun 23",
    Applications: 124,
  },
];

export interface DailyApplicationsProps {
  chartdata: {
    date: string;
    Applications: number;
  }[];
}
export function DailyApplications(props: DailyApplicationsProps) {
  
  
  let intervals = [
    {
      label: "Last 7 days",
      value: "7",
    },
    {
      label: "Last 30 days",
      value: "30",
    },
    {
      label: "Last 90 days",
      value: "90",
    },
  ];
  

  return (
    <Card className="max-md:px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg font-medium">
          Daily Applications
        </h3>

        <Select disabled defaultValue="7">
          <SelectTrigger className="w-fit gap-2">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            {intervals.map((interval) => (
              <SelectItem key={interval.value} value={interval.value}>
                {interval.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <AreaChart
        className="mt-4 h-72"
        data={props.chartdata}
        index="date"
        categories={["Applications"]}
        colors={["lime"]}
        yAxisWidth={30}
      />
    </Card>
  );
}
