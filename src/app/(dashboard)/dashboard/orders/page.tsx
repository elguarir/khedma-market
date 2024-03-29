import { Separator } from "@/components/ui/separator";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Order } from "./_components/data/schema";

type Props = {};

const OrdersPage = (props: Props) => {
  const orders: Order[] = [
    {
      buyer: {
        id: "1",
        name: "John Doe",
        image: "http://example.com/image.jpg",
        username: "johndoe",
        email: "john@example.com",
      },
      gig: {
        id: "1",
        title: "Example Gig",
        main_image: "https://khedma-market.s3.amazonaws.com/93a49d4e-d3bc-4c8b-965b-9ebf9e6a33f1/1_Wm_1welTDGIGMf2s3sQhfQ.webp",
        description: "This is an example gig",
        price: 100,
      },
      due_on: new Date("2024-04-17"),
      status: "processing",
      total: 100,
    },
  ];

  return (
    <main>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-2 max-sm:flex-col">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">View and manage your orders</p>
          </div>
          <div className="flex items-center justify-end max-sm:w-full">
            {/* <AddNew /> */}
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <ScrollArea className="w-[calc(100vw-50px)] max-w-full pb-2 lg:w-[calc(100vw-380px)]">
        <DataTable data={orders} columns={columns} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  );
};

export default OrdersPage;
