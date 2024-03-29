"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "./data/data";
import { Order } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="min-w-40"
        column={column}
        title="Buyer"
      />
    ),
    cell: ({ row }) => {
      let buyer = row.getValue("buyer") as Order["buyer"];

      return (
        <div className="flex max-w-[500px] items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={buyer.image} />
            <AvatarFallback>
              <img src="/images/placeholder.png" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate font-medium">{buyer.name}</div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      let buyer = row.getValue("buyer") as Order["buyer"];
      return buyer.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "gig",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gig" />
    ),
    cell: ({ row }) => {
      let gig = row.getValue("gig") as Order["gig"];

      return (
        <div className="flex min-w-[250px] max-w-[500px] items-center space-x-2">
          <div>
            <img
              src={gig.main_image}
              className="aspect-video w-16 rounded-[2px] object-cover"
            />
          </div>
          <div className="flex max-w-[300px] truncate font-medium">
            {gig.title}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      let gig = row.getValue("gig") as Order["gig"];
      return gig.title.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[140px] items-center">
          <Badge
            variant={status.variant}
            className="rounded-[8px] font-medium"
          >
            {status.icon && <status.icon className="mr-2 h-4 w-4" />}
            <span>{status.label}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "due_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due on" />
    ),
    cell: ({ row }) => {
      let due_on = row.getValue("due_on") as Order["due_on"];

      return (
        <div className="flex items-center">
          {format(due_on, "MMM dd")}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
